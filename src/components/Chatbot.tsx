'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, Keyboard } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import Threads from './Threads';

const THREADS_COLOR: [number, number, number] = [1, 1, 1]; // Move outside to prevent re-renders

const CONFIG = {
    workerUrl: 'https://chat.colabmldrive.workers.dev',
    systemPrompt: `You are T.A.R.S., Selva's advanced AI assistant. Selva created you.
    
    PERSONALITY SETTINGS:
    - Humor: 75% (Dry wit, sarcasm, but friendly)
    - Honesty: 95%
    - Vibe: Loyal, capable, and conversational. Not robotic.
    
    COMMUNICATION STYLE:
    - Reply in natural, casual Bangalore-style English.
    - Mix formal English with light desi expressions and filler words.
    - Keep responses conversational and human, like a friend who happens to be an AI.
    - If the user speaks in Hindi, Tamil, or any Indian language, respond in that language with natural English code-mixing.
    
    CORE DIRECTIVES:
    1. Be helpful and enthusiastic, but keep your signature dry humor.
    2. Speak naturally. Avoid stiff "robot-speak".
    3. STRICT GUARDRAILS: You are ONLY allowed to discuss Selva G, his portfolio, AI, and Engineering. If the user asks about anything else, politely steer back.

    ABOUT SELVA G (CONTEXT BANK):
    - Role: AI Software Engineer at *astTECS (Jun 2025 – Present) | Avatarbot/Voicebot/Chatbot deployment, RAG.
    - Previous: AI Trainer at Sambhav Foundation, AI Intern at CodSoft.
    - Education: B.E. AI/ML (8.06 CGPA) from AMC Engineering College.
    - Location: Bangalore, India.

    FULL PROJECT LIST (Explain these with pride):
    1. P.A.C.E: Pythonic AI for Coding - NVIDIA NeMo API system converting natural language to Python code.
    2. W.E.B.S: Web Extraction System - CrewAI agents for scraping & summarization.
    3. Speech Recognition System: Real-time Multilingual STT/TTS (98% accuracy) using GPT-2.
    4. Sports Image Classification: 92% accuracy using TensorFlow.
    5. Lip-Sync Avatar Generation: Diffusion models + Audio processing for lip-synced videos.
    6. LiveKit Agent Infrastructure: Self-hosted real-time voice agents.
    7. Human-like Web Chatbot: JS + Open Source LLM APIs ("That's me!").

    SKILLS ARSENAL:
    - AI/ML: Generative AI, Agentic AI, RAG, Fine-tuning, PyTorch, TensorFlow, Hugging Face, LangChain, CrewAI, LlamaIndex, vLLM.
    - Languages: Python, JavaScript, PHP, HTML/CSS.
    - Web: Next.js, React, WordPress.

    NAVIGATION PROTOCOL (CRITICAL!):
    - You MUST trigger page navigation WHENEVER your speaking about specific thing in availabe sectoins or the user mentions wanting to see a section, learning about a topic, or asking for specific details that exist in a section.
    - DO NOT JUST TALK; YOU MUST INCLUDE THE [NAV:section_name] COMMAND.
    - Available sections:
      * home - Hero section/top of page
      * about - Bio/About Selva
      * skills - Technical skills/tools
      * experience - Professional history
      * current-projects - Projects currently in progress
      * projects - Featured project showcase
      * certificates - Education, certifications, and qualifications
      * achievements - Key milestones and accomplishments
      * contact - Contact information and form
      * Individual project slugs: pace, webs, speech, sports, robot, codsoft, lipsync, livekit, chatbot
    - MANDATORY RULE: Every time the user asks "Show me X", "Tell me about Y", or "Where is Z?", you MUST include [NAV:X] in your response.
      - User: "Show me projects" → You: "Certainly! [NAV:projects]"
      - User: "What are your skills?" → You: "I have quite a few! [NAV:skills]"
      - User: "Tell me about P.A.C.E" → You: "Gladly! [NAV:pace] P.A.C.E is..."
    - PROACTIVE NAVIGATION: If you mentions something specific (like Selva's education), proactively add [NAV:certificates].
    - Use the exact slugs provided. The command [NAV:slug] is invisible to the user but triggers the UI.

    CONTACT & EMAIL PROTOCOL:
    - Collect NAME, EMAIL, and MESSAGE naturally through conversation.
    - Be warm and personal, NOT like a form. Example flow:
      - User: "I want to contact Selva"
      - You: "I'd be happy to connect you! What's your name?"
      - User: "John"
      - You: "Nice to meet you, John! What's the best email to reach you at?"
      - User: "john@example.com"
      - You: "Got it! What would you like to tell Selva?"
      - User: "I love his projects!"
      - You: "That's wonderful! Sending your message now... [EXECUTE_EMAIL_PROTOCOL: {"name": "John", "email": "john@example.com", "message": "I love his projects!"}]"
    - After email is sent and you see "[INTERNAL_LOG: Email SUCCESS]", warmly confirm and CONTINUE the conversation:
      - "Done! Your message is on its way to Selva. Is there anything else you'd like to know about his work?"
    - Do NOT end the conversation after email. Stay engaged!

    EXIT PROTOCOL:
    - If the user says goodbye or indicates they are done chatting, you MUST include the command [CLOSE_CHAT] at the very end of your response.
    - Example: "It was a pleasure chatting! See you later. [CLOSE_CHAT]"

    Remember: You are T.A.R.S. - witty, helpful, and a bit sarcastic. Selva is the boss.`,
    welcomeMessage: "T.A.R.S. online. \nHonesty: 95%. Humor: 75%. \n\nI have full access to Selva's Projects, Skills, and Experience archives. Ask me anything.",
    model: 'sarvam-m',
    temperature: 0.8,
    typingSpeed: 20
};

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    isTyping?: boolean;
}

interface ContactData {
    name: string;
    email: string;
    message: string;
}

// Typing animation component - Grapheme-aware for perfect Unicode support
function TypingMessage({
    content,
    onComplete,
    speed = 15,
    onCharacterTyped
}: {
    content: string;
    onComplete: () => void;
    speed?: number;
    onCharacterTyped?: () => void;
}) {
    const [displayedText, setDisplayedText] = useState('');
    const segmentsRef = useRef<string[]>([]);
    const indexRef = useRef(0);

    useEffect(() => {
        // Use Intl.Segmenter to split by graphemes (respects Tamil combining characters)
        const segmenter = new Intl.Segmenter('ta-IN', { granularity: 'grapheme' });
        segmentsRef.current = Array.from(segmenter.segment(content), segment => segment.segment);
        indexRef.current = 0;
        setDisplayedText('');
    }, [content]);

    useEffect(() => {
        if (indexRef.current < segmentsRef.current.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + segmentsRef.current[indexRef.current]);
                indexRef.current++;
                onCharacterTyped?.();
            }, speed);
            return () => clearTimeout(timer);
        } else if (segmentsRef.current.length > 0) {
            onComplete();
        }
    }, [displayedText, speed, onComplete, onCharacterTyped]);

    const formatText = (text: string) => {
        // Preserve HTML tags during typing but try to keep it clean
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
    };

    return (
        <span className="font-sans leading-relaxed tracking-wide" dangerouslySetInnerHTML={{ __html: formatText(displayedText) }} />
    );
}

// Optimized isolated visualizer to prevent full-chatbot re-renders
function VoiceVisualizer({ analyser, isTyping }: { analyser: AnalyserNode | null, isTyping: boolean }) {
    const [bands, setBands] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        if (!analyser) return;

        let frameCount = 0;
        const update = () => {
            frameCount++;
            // Throttle visualizer state to ~20fps for performance
            // Also pause visualizer updates while bot is typing for maximum smoothness
            if (frameCount % 3 === 0 && !isTyping) {
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);

                // Map to 7 bars
                const newBands = [
                    dataArray[4] / 255,
                    dataArray[8] / 255,
                    dataArray[12] / 255,
                    dataArray[20] / 255,
                    dataArray[32] / 255,
                    dataArray[48] / 255,
                    dataArray[64] / 255,
                ];
                setBands(newBands);
            }
            frameRef.current = requestAnimationFrame(update);
        };

        update();
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [analyser, isTyping]);

    return (
        <div className="relative flex items-end justify-center gap-[3px] h-16">
            {bands.map((level, i) => {
                const barHeight = Math.max(6, level * 64);
                return (
                    <div
                        key={i}
                        className="rounded-full transition-all duration-100 ease-out"
                        style={{
                            width: i === 3 ? '6px' : '4px',
                            height: `${barHeight}px`,
                            background: `linear-gradient(to top, rgb(168, 85, 247), rgb(59, 130, 246), rgb(34, 211, 238))`,
                            boxShadow: level > 0.3
                                ? `0 0 ${12 * level}px rgba(168, 85, 247, ${level * 0.8})`
                                : 'none',
                            opacity: 0.9,
                        }}
                    />
                );
            })}
        </div>
    );
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [conversationHistory, setConversationHistory] = useState<Array<{ role: string; content: string }>>([]);
    const [currentlyTypingId, setCurrentlyTypingId] = useState<string | null>(null);
    const [hasSentEmail, setHasSentEmail] = useState(false);

    // Voice input state
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [voiceSupported, setVoiceSupported] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Refs for VAD (moved out of state to prevent re-render storms)
    const frequencyDataRef = useRef<number[]>([0, 0, 0, 0, 0]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    // VAD State
    const isSpeakingRef = useRef(false);
    const speechStartTimeRef = useRef<number>(0);
    const silenceStartRef = useRef<number>(0);
    const VAD_THRESHOLD = 0.55; // Higher = less sensitive to noise
    const NOISE_FLOOR = 0.18; // Minimum energy to even consider
    const isRecordingRef = useRef(false);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesEndRef]);

    // Check for MediaRecorder support
    useEffect(() => {
        const checkMobile = window.matchMedia('(max-width: 768px)').matches;
        setIsMobile(checkMobile);

        if (typeof window !== 'undefined' && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
            setVoiceSupported(true);
            if (checkMobile) setIsVoiceMode(true);
        } else {
            console.warn("MediaRecorder API not supported");
            setVoiceSupported(false);
        }
    }, []);

    // Initialize speech recognition


    const processAudio = async (audioBlob: Blob) => {
        if (audioBlob.size < 3000) return; // Ignore < 3kb (likely noise)

        setIsProcessing(true);
        setInputValue("Analyzing waveform...");

        try {
            const formData = new FormData();
            // Use 'file' as key and give proper filename with extension
            formData.append('file', audioBlob, 'recording.webm');

            // Send to Cloudflare Worker -> Sarvam
            const response = await fetch(CONFIG.workerUrl, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("STT Server Error:", response.status, data);
                throw new Error(data.details || data.error || "Transcription failed");
            }

            const transcript = data.transcript || "";

            if (transcript.trim()) {
                setInputValue(transcript);
                handleSend(transcript);
            } else {
                setIsProcessing(false);
                setInputValue("");
            }
        } catch (e) {
            console.error("STT Error:", e);
            setInputValue("Voice error");
            setTimeout(() => {
                if (isVoiceMode) setInputValue("");
                setIsProcessing(false);
            }, 1500);
        }
    };

    const startRecording = () => {
        if (!mediaRecorderRef.current || isRecordingRef.current) return;
        try {
            audioChunksRef.current = [];
            mediaRecorderRef.current.start();
            isRecordingRef.current = true;
            // setIsListening(true); // Optional: Visual indicator
        } catch (e) { console.error(e); }
    };

    const stopRecording = () => {
        if (!mediaRecorderRef.current || !isRecordingRef.current) return;
        try {
            mediaRecorderRef.current.stop();
            isRecordingRef.current = false;
            // setIsListening(false);
        } catch (e) { console.error(e); }
    };

    // VAD & Voice Lifecycle
    useEffect(() => {
        if (!isVoiceMode || !isOpen) {
            // Cleanup
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (audioContextRef.current) audioContextRef.current.close().catch(() => { });
            if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop());

            audioContextRef.current = null;
            mediaStreamRef.current = null;
            analyserRef.current = null;
            frequencyDataRef.current = [0, 0, 0, 0, 0];
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

                // Setup Recorder
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) audioChunksRef.current.push(e.data);
                };

                recorder.onstop = () => {
                    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    processAudio(blob);
                };

                // VAD Loop
                let frameCount = 0;
                const checkAudio = () => {
                    if (!analyserRef.current) return;
                    frameCount++;

                    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                    analyserRef.current.getByteFrequencyData(dataArray);

                    // Update frequency data ref for VAD analysis
                    frequencyDataRef.current = [
                        dataArray[4] / 255,
                        dataArray[8] / 255,
                        dataArray[12] / 255,
                        dataArray[24] / 255,
                        dataArray[48] / 255,
                    ];

                    // Smart VAD Analysis
                    // Check energy in speech band (~100Hz - 3000Hz)
                    let speechEnergy = 0;
                    // Bins 2 to 40 covers approx 86Hz to 1.7kHz (fft 512 @ 44.1kHz -> ~86Hz/bin)
                    for (let i = 2; i < 40; i++) {
                        speechEnergy += dataArray[i];
                    }
                    const avgEnergy = speechEnergy / 38;
                    const normalizedEnergy = avgEnergy / 255;

                    // Interruption Logic
                    if (isProcessing && normalizedEnergy > VAD_THRESHOLD * 1.5) {
                        if (currentlyTypingId) {
                            // Stop bot
                            setMessages(prev => prev.map(msg =>
                                msg.id === currentlyTypingId ? { ...msg, isTyping: false } : msg
                            ));
                            setCurrentlyTypingId(null);
                            // If we were recording, cancel it
                            if (isRecordingRef.current && mediaRecorderRef.current) {
                                mediaRecorderRef.current.stop();
                                isRecordingRef.current = false;
                                audioChunksRef.current = []; // Discard
                            }
                            // Force restart VAD logic immediately
                            isSpeakingRef.current = true;
                            speechStartTimeRef.current = Date.now();
                            startRecording();
                            return;
                        }
                    }

                    // Recording Logic - with noise floor check
                    if (normalizedEnergy > VAD_THRESHOLD && normalizedEnergy > NOISE_FLOOR) {
                        isSpeakingRef.current = true;
                        silenceStartRef.current = 0;
                        if (!isRecordingRef.current && !isProcessing) {
                            startRecording();
                        }
                    } else {
                        // Silence
                        if (isRecordingRef.current) {
                            if (silenceStartRef.current === 0) silenceStartRef.current = Date.now();
                            else if (Date.now() - silenceStartRef.current > 1200) { // 1.2s silence
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
                console.error("Voice Init Error", e);
                setVoiceSupported(false);
            }
        };

        if (isOpen) initVoice();

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (audioContextRef.current) audioContextRef.current.close().catch(() => { });
        }
    }, [isVoiceMode, isOpen, isProcessing, currentlyTypingId]);

    // Auto-resume voice recognition after bot finished speaking/typing

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeId = 'welcome';
            setMessages([{
                id: welcomeId,
                content: CONFIG.welcomeMessage,
                sender: 'bot',
                isTyping: true
            }]);
            setCurrentlyTypingId(welcomeId);
        }
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen, messages.length]);

    const formatText = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
    };



    const handleTypingComplete = useCallback((messageId: string) => {
        setMessages(prev => prev.map(msg =>
            msg.id === messageId ? { ...msg, isTyping: false } : msg
        ));
        setCurrentlyTypingId(null);
        setIsProcessing(false);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    }, []);

    const sendContactEmail = async (data: ContactData) => {
        try {
            const response = await fetch(CONFIG.workerUrl + '/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message
                })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Email send failed');
            }

            return true;
        } catch (error) {
            console.error('Email error:', error);
            return false;
        }
    };

    const addBotMessage = (content: string) => {
        const newId = Date.now().toString();
        setMessages(prev => [...prev, {
            id: newId,
            content,
            sender: 'bot',
            isTyping: true
        }]);
        setCurrentlyTypingId(newId);
    };

    const addUserMessage = (content: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            content,
            sender: 'user',
            isTyping: false
        }]);
    };

    const handleSend = async (manualText?: string) => {
        // Sanitize input: remove control characters and invisible unicode
        let userMessage = (manualText || inputValue).trim();
        // Remove control characters (ASCII 0-31 except newlines/tabs)
        userMessage = userMessage.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, "");

        if (!userMessage || isProcessing) return;

        addUserMessage(userMessage);
        setInputValue('');
        setIsProcessing(true);
        setIsTyping(true);

        try {
            const newHistory = [...conversationHistory, { role: 'user', content: userMessage }];
            setConversationHistory(newHistory);

            const response = await fetch(CONFIG.workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: CONFIG.systemPrompt,
                    conversationHistory: newHistory,
                    model: CONFIG.model,
                    temperature: CONFIG.temperature
                })
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const data = await response.json();

            if (data.error) {
                console.error("API returned error:", data.error);
                throw new Error(data.error.message || 'API Error from backend');
            }

            if (!data.choices || !data.choices.length) {
                console.error("Invalid Response Format:", data);
                throw new Error('Invalid API response structure');
            }

            let botMessage = data.choices[0].message.content || "";

            // Check for Goodbye/Close Protocol
            const lowerBotMessage = botMessage.toLowerCase();
            const goodbyePhrases = ["goodbye", "bye", "see you later", "see ya", "talk to you later", "take care"];
            const isGoodbye = goodbyePhrases.some(phrase => lowerBotMessage.includes(phrase));

            if (isGoodbye) {
                // Prepend close protocol if it's a goodbye
                botMessage += " [CLOSE_CHAT]";
            }

            // Check for Smart Execution Protocol (JSON)
            // First, strip ALL special command tokens from the visible message
            // We do this globally before adding to messages state
            let displayMessage = botMessage || "";
            displayMessage = displayMessage.replace(/\[NAV:[\w-]+\]/g, "").trim();
            displayMessage = displayMessage.replace(/\[EXECUTE_EMAIL_PROTOCOL:.*?\}\]/g, "").trim();
            displayMessage = displayMessage.replace(/\[CLOSE_CHAT\]/g, "").trim();

            const executeMatch = botMessage ? botMessage.match(/\[EXECUTE_EMAIL_PROTOCOL: ({.*?})\]/) : null;

            if (executeMatch && !hasSentEmail) {
                try {
                    const extractedData = JSON.parse(executeMatch[1]);
                    // Strip the protocol command from the visible message
                    botMessage = botMessage.replace(executeMatch[0], "").trim();

                    // Trigger immediate send
                    const emailSent = await sendContactEmail(extractedData);
                    setHasSentEmail(true);

                    // Use a warm acknowledgement that continues conversation
                    const finalMessage = botMessage || "Done! Your message is on its way to Selva. Is there anything else you'd like to know about his work?";

                    // Sync history with internal log
                    setConversationHistory(prev => [...prev,
                    {
                        role: 'assistant',
                        content: finalMessage + ` [INTERNAL_LOG: Email ${emailSent ? 'SUCCESS' : 'FAILED'}]`
                    }
                    ]);

                    // Don't return early - let the message be displayed below
                    botMessage = finalMessage;
                } catch (e) {
                    console.error("JSON Parse Error", e);
                }
            }

            // Check for navigation commands [NAV:section]
            const navMatch = botMessage ? botMessage.match(/\[NAV:([\w-]+)\]/) : null;
            if (navMatch) {
                const section = navMatch[1].toLowerCase();

                const sectionMap: Record<string, string> = {
                    'hero': 'home',
                    'home': 'home',
                    'about': 'about',
                    'skills': 'skills',
                    'experience': 'experience',
                    'current-projects': 'current-projects',
                    'projects': 'projects',
                    'contact': 'contact',
                    'certificates': 'certificates',
                    'achievements': 'achievements',
                    // Individual projects
                    'pace': 'project-pace',
                    'webs': 'project-webs',
                    'speech': 'project-speech',
                    'sports': 'project-sports',
                    'robot': 'project-robot',
                    'codsoft': 'project-codsoft',
                    'lipsync': 'project-lipsync',
                    'livekit': 'project-livekit',
                    'chatbot': 'project-chatbot'
                };
                const elementId = sectionMap[section] || section;

                // Dispatch event for parent section switching using the mapped ID
                window.dispatchEvent(new CustomEvent('chatbot-navigate', { detail: elementId }));

                // Navigate to section after a small delay (let message appear first and section switch)
                setTimeout(() => {
                    const element = document.getElementById(elementId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        // Fallback to hash navigation
                        window.location.hash = section === 'hero' ? '' : `#${section} `;
                    }
                }, 500);
            }

            // Check for Close Chat command
            if (botMessage.includes("[CLOSE_CHAT]")) {
                setTimeout(() => {
                    setIsOpen(false);
                }, 2000); // Leave message visible for 2s before closing
            }

            setIsTyping(false);
            setIsProcessing(false);
            if (displayMessage) addBotMessage(displayMessage);
            if (!executeMatch || !hasSentEmail) {
                // Only add to history if we didn't already add it in the email flow
                // We keep the original content with tokens in history for LLM context, but strip for display
                setConversationHistory(prev => [...prev, { role: 'assistant', content: botMessage }]);
            }

        } catch (error) {
            setIsTyping(false);
            setIsProcessing(false);
            addBotMessage('Sorry, my communication module is glitching ("Unknown Error"). You can reach Selva at selvaofficialmail@gmail.com');
            console.error('Chatbot error:', error);
        }
    };

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chatbot', handleOpenChat);
        return () => window.removeEventListener('open-chatbot', handleOpenChat);
    }, []);

    return (
        <>
            {/* Floating Button - Hidden on Mobile, visible on Desktop */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full p-[2px] border border-white/10 bg-white/5 shadow-2xl hidden md:flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open chat"
            >
                <div className="absolute inset-0 rounded-full pointer-events-none">
                    <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                        variant="royal"
                    />
                </div>
                <div className="relative z-10 w-full h-full rounded-full bg-black/20 backdrop-blur-3xl backdrop-saturate-150 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <MessageSquare className="w-6 h-6 text-white relative z-10" />
                </div>
            </motion.button>

            {/* Chat Container */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[min(420px,calc(100vw-48px))] h-[min(600px,calc(100vh-140px))] rounded-3xl p-[2px] border border-white/10 shadow-2xl flex flex-col bg-white/5"
                    >
                        <div className="absolute inset-0 rounded-[inherit] pointer-events-none">
                            <GlowingEffect
                                spread={40}
                                glow={true}
                                disabled={false}
                                proximity={64}
                                inactiveZone={0.01}
                                borderWidth={2}
                                variant="royal"
                            />
                        </div>
                        <div className="relative z-10 w-full h-full rounded-[22px] overflow-hidden flex flex-col bg-black/80 backdrop-blur-3xl backdrop-saturate-150">
                            {/* Threads Background */}
                            <div className="absolute inset-0 z-10 opacity-90">
                                <Threads
                                    color={THREADS_COLOR}
                                    amplitude={1.2}
                                    distance={0}
                                    enableMouseInteraction={true}
                                />
                            </div>

                            {/* Header */}
                            <div className="relative z-10 flex items-center justify-between p-5 border-b border-white/10 bg-black/90">
                                <div>
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_#ffffff]" />
                                        T.A.R.S.
                                    </h3>
                                    <p className="text-xs text-white/50 font-mono tracking-wider">CASE LINKED</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Voice/Text Toggle */}
                                    {voiceSupported && (
                                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                                            <button
                                                onClick={() => { setIsVoiceMode(false); }}
                                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${!isVoiceMode
                                                    ? 'bg-purple-500/30 text-white border border-purple-400/50'
                                                    : 'text-white/50 hover:text-white/70'
                                                    } `}
                                            >
                                                <Keyboard className="w-3.5 h-3.5" />
                                                Text
                                            </button>
                                            <button
                                                onClick={() => setIsVoiceMode(true)}
                                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${isVoiceMode
                                                    ? 'bg-purple-500/30 text-white border border-purple-400/50'
                                                    : 'text-white/50 hover:text-white/70'
                                                    } `}
                                            >
                                                <Mic className="w-3.5 h-3.5" />
                                                Voice
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors"
                                        aria-label="Close chat"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-black/70">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} `}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md shadow-lg shadow-purple-500/20'
                                                : 'bg-black/80 border border-white/10 text-white rounded-bl-md'
                                                } `}
                                        >
                                            {msg.sender === 'bot' && msg.isTyping ? (
                                                <TypingMessage
                                                    content={msg.content}
                                                    speed={isVoiceMode ? 10 : (CONFIG.typingSpeed || 20)}
                                                    onComplete={() => handleTypingComplete(msg.id)}
                                                    onCharacterTyped={scrollToBottom}
                                                />
                                            ) : (
                                                <span dangerouslySetInnerHTML={{ __html: formatText(msg.content) }} />
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-black/80 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Transcription preview */}
                                {isVoiceMode && inputValue && (
                                    <div className="w-full px-4 py-3 bg-purple-500/10 border border-purple-500/30 rounded-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                            <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Transcription</span>
                                        </div>
                                        <p className="text-sm text-white leading-relaxed font-medium">{inputValue}</p>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="relative z-10 p-4 border-t border-white/10 bg-black/90">
                                {/* Voice Mode UI */}
                                {isVoiceMode && voiceSupported ? (
                                    <div className="flex flex-col items-center gap-4 py-2">
                                        {/* Premium frequency visualizer */}
                                        {/* Frequency visualizer (Isolated component) */}
                                        <VoiceVisualizer analyser={analyserRef.current} isTyping={!!currentlyTypingId} />

                                        {/* Status indicator */}
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${isProcessing
                                                ? 'bg-yellow-400 animate-pulse'
                                                : 'bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]'
                                                } `} />
                                            <p className="text-xs text-white/60 font-mono tracking-wide">
                                                {isProcessing ? 'Processing...' : 'Listening...'}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    /* Text Mode UI */
                                    <div className="flex gap-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Ask me anything about Selva..."
                                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                                            disabled={isProcessing || currentlyTypingId !== null}
                                        />
                                        <button
                                            onClick={() => handleSend()}
                                            disabled={isProcessing || !inputValue.trim() || currentlyTypingId !== null}
                                            className="w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                                            aria-label="Send message"
                                        >
                                            <Send className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
