'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseVoiceInputOptions {
    workerUrl: string;
    onTranscript: (text: string) => void;
    isEnabled: boolean;
    isProcessingChat: boolean;
    currentlyTypingId: string | null;
    onInterrupt?: () => void;
}

interface UseVoiceInputReturn {
    frequencyData: number[];
    isRecording: boolean;
    voiceSupported: boolean;
    statusText: string;
}

// VAD Configuration
const VAD_THRESHOLD = 0.75;
const NOISE_FLOOR = 0.28;
const SILENCE_TIMEOUT = 1200; // ms

export function useVoiceInput({
    workerUrl,
    onTranscript,
    isEnabled,
    isProcessingChat,
    currentlyTypingId,
    onInterrupt
}: UseVoiceInputOptions): UseVoiceInputReturn {
    const [frequencyData, setFrequencyData] = useState<number[]>([0, 0, 0, 0, 0]);
    const [voiceSupported, setVoiceSupported] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [statusText, setStatusText] = useState('Ready');

    // Refs for audio processing (no re-renders)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    // VAD state (refs to avoid re-renders)
    const isSpeakingRef = useRef(false);
    const silenceStartRef = useRef<number>(0);
    const isRecordingRef = useRef(false);
    const isProcessingRef = useRef(false);

    // Check support on mount
    useEffect(() => {
        if (typeof window !== 'undefined' &&
            navigator.mediaDevices &&
            typeof navigator.mediaDevices.getUserMedia === 'function') {
            setVoiceSupported(true);
        }
    }, []);

    // Process recorded audio
    const processAudio = useCallback(async (audioBlob: Blob) => {
        if (audioBlob.size < 3000) {
            isProcessingRef.current = false;
            return;
        }

        isProcessingRef.current = true;
        setStatusText('Analyzing waveform...');

        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.webm');

            const response = await fetch(workerUrl, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('STT Error:', data);
                throw new Error(data.details || 'Transcription failed');
            }

            const transcript = data.transcript || '';
            if (transcript.trim()) {
                onTranscript(transcript);
            }
        } catch (e) {
            console.error('Voice Error:', e);
            setStatusText('Voice error');
        } finally {
            isProcessingRef.current = false;
            setStatusText('Listening...');
        }
    }, [workerUrl, onTranscript]);

    // Recording controls
    const startRecording = useCallback(() => {
        if (!mediaRecorderRef.current || isRecordingRef.current) return;
        try {
            audioChunksRef.current = [];
            mediaRecorderRef.current.start();
            isRecordingRef.current = true;
            setIsRecording(true);
        } catch (e) {
            console.error('Start recording error:', e);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (!mediaRecorderRef.current || !isRecordingRef.current) return;
        try {
            mediaRecorderRef.current.stop();
            isRecordingRef.current = false;
            setIsRecording(false);
        } catch (e) {
            console.error('Stop recording error:', e);
        }
    }, []);

    // Main voice lifecycle
    useEffect(() => {
        if (!isEnabled) {
            // Cleanup
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (audioContextRef.current) audioContextRef.current.close().catch(() => { });
            if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop());

            audioContextRef.current = null;
            mediaStreamRef.current = null;
            analyserRef.current = null;
            setFrequencyData([0, 0, 0, 0, 0]);
            setStatusText('Ready');
            return;
        }

        const initVoice = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStreamRef.current = stream;

                const audioContext = new AudioContext();
                audioContextRef.current = audioContext;

                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 512;
                analyserRef.current = analyser;

                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);

                // Setup recorder
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) audioChunksRef.current.push(e.data);
                };

                recorder.onstop = () => {
                    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    processAudio(blob);
                };

                setStatusText('Listening...');

                // VAD Loop - runs at 60fps but only updates React state throttled
                let frameCount = 0;
                const checkAudio = () => {
                    if (!analyserRef.current) return;
                    frameCount++;

                    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                    analyserRef.current.getByteFrequencyData(dataArray);

                    // Throttle visualizer updates to ~15fps
                    if (frameCount % 4 === 0) {
                        const bands = [
                            dataArray[4] / 255,
                            dataArray[8] / 255,
                            dataArray[12] / 255,
                            dataArray[20] / 255,
                            dataArray[40] / 255,
                        ];
                        setFrequencyData(bands);
                    }

                    // VAD Analysis (speech band energy)
                    let speechEnergy = 0;
                    for (let i = 2; i < 40; i++) {
                        speechEnergy += dataArray[i];
                    }
                    const normalizedEnergy = (speechEnergy / 38) / 255;

                    // Interruption detection
                    if (isProcessingChat && normalizedEnergy > VAD_THRESHOLD * 1.5 && currentlyTypingId) {
                        onInterrupt?.();
                        return;
                    }

                    // Recording logic
                    if (normalizedEnergy > VAD_THRESHOLD && normalizedEnergy > NOISE_FLOOR) {
                        isSpeakingRef.current = true;
                        silenceStartRef.current = 0;
                        if (!isRecordingRef.current && !isProcessingRef.current) {
                            startRecording();
                        }
                    } else {
                        if (isRecordingRef.current) {
                            if (silenceStartRef.current === 0) {
                                silenceStartRef.current = Date.now();
                            } else if (Date.now() - silenceStartRef.current > SILENCE_TIMEOUT) {
                                stopRecording();
                                silenceStartRef.current = 0;
                                isSpeakingRef.current = false;
                            }
                        }
                    }

                    animationFrameRef.current = requestAnimationFrame(checkAudio);
                };

                checkAudio();

            } catch (e) {
                console.error('Voice init error:', e);
                setVoiceSupported(false);
            }
        };

        initVoice();

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isEnabled, isProcessingChat, currentlyTypingId, onInterrupt, processAudio, startRecording, stopRecording]);

    return {
        frequencyData,
        isRecording,
        voiceSupported,
        statusText
    };
}
