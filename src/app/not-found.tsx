'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Mail, Zap, Trophy } from 'lucide-react';
import Link from 'next/link';
import Hyperspeed from '@/components/Hyperspeed';
import GlassCard from '@/components/GlassCard';
import GlitchText from '@/components/GlitchText';

// Web Audio hyperspeed sound generator
class HyperspeedSound {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private isPlaying = false;

  init() {
    if (this.audioContext) return;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create gain nodes
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0;
    this.gainNode.connect(this.audioContext.destination);

    this.noiseGain = this.audioContext.createGain();
    this.noiseGain.gain.value = 0;
    this.noiseGain.connect(this.audioContext.destination);
  }

  private createNoiseBuffer(): AudioBuffer {
    const bufferSize = this.audioContext!.sampleRate * 2;
    const buffer = this.audioContext!.createBuffer(1, bufferSize, this.audioContext!.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  start() {
    if (!this.audioContext || this.isPlaying) return;

    // Resume context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    // Create oscillator for whoosh base
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sawtooth';
    this.oscillator.frequency.value = 80;
    this.oscillator.connect(this.gainNode!);
    this.oscillator.start();

    // Create noise for wind effect
    this.noiseNode = this.audioContext.createBufferSource();
    this.noiseNode.buffer = this.createNoiseBuffer();
    this.noiseNode.loop = true;
    this.noiseNode.connect(this.noiseGain!);
    this.noiseNode.start();

    this.isPlaying = true;
  }

  updateSpeed(speed: number) {
    if (!this.audioContext || !this.isPlaying) return;

    // Clamp speed between 0 and 1
    const normalizedSpeed = Math.min(1, Math.max(0, speed));

    // Update oscillator frequency (80Hz to 200Hz based on speed)
    if (this.oscillator) {
      this.oscillator.frequency.setTargetAtTime(
        80 + normalizedSpeed * 120,
        this.audioContext.currentTime,
        0.1
      );
    }

    // Update volumes
    if (this.gainNode) {
      this.gainNode.gain.setTargetAtTime(
        normalizedSpeed * 0.15,
        this.audioContext.currentTime,
        0.1
      );
    }

    if (this.noiseGain) {
      this.noiseGain.gain.setTargetAtTime(
        normalizedSpeed * 0.08,
        this.audioContext.currentTime,
        0.1
      );
    }
  }

  stop() {
    if (!this.isPlaying) return;

    // Fade out
    if (this.gainNode && this.audioContext) {
      this.gainNode.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.3);
    }
    if (this.noiseGain && this.audioContext) {
      this.noiseGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.3);
    }

    // Stop and cleanup after fade
    setTimeout(() => {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      this.isPlaying = false;
    }, 400);
  }

  dispose() {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export default function NotFound() {
  const [isHolding, setIsHolding] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const soundRef = useRef<HyperspeedSound | null>(null);

  // Initialize sound on first interaction
  const initSound = useCallback(() => {
    if (!soundRef.current) {
      soundRef.current = new HyperspeedSound();
      soundRef.current.init();
    }
  }, []);

  // Handle mouse move for direction tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Sound effects tied to holding state
  useEffect(() => {
    if (!soundRef.current || isMuted) return;

    if (isHolding) {
      soundRef.current.start();
      setShowSpeedLines(true);
    } else {
      soundRef.current.stop();
      setShowSpeedLines(false);
    }
  }, [isHolding, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.dispose();
      }
    };
  }, []);

  // Dynamic effect options based on mouse position
  const effectOptions = React.useMemo(() => ({
    distortion: 'turbulentDistortion' as const,
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2
  }), []);

  return (
    <main className="h-screen relative overflow-hidden flex items-center justify-center">
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 z-0 text-white">
        <Hyperspeed effectOptions={effectOptions} isSpeedingUp={isHolding} mousePosition={mousePosition} />
      </div>

      {/* Speed Lines Overlay */}
      <AnimatePresence>
        {showSpeedLines && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Chromatic Aberration Effect on Speed */}
      <AnimatePresence>
        {showSpeedLines && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen"
            style={{
              background: `linear-gradient(${mousePosition.x * 180}deg, rgba(255,0,255,0.1) 0%, transparent 50%, rgba(0,255,255,0.1) 100%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Flash Effect */}
      <AnimatePresence>
        {isHolding && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-[3] pointer-events-none bg-white"
          />
        )}
      </AnimatePresence>

      {/* Score & Interactive Area */}
      <ScoreCounter
        isHolding={isHolding}
        setIsHolding={setIsHolding}
        initSound={initSound}
        soundRef={soundRef}
        isMuted={isMuted}
        mousePosition={mousePosition}
      />

      {/* Main UI Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full pointer-events-none"
      >
        {/* Glitch 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4 md:mb-6"
        >
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={false}
            className="!text-[clamp(3rem,15vw,10rem)]"
          >
            Oops! 404
          </GlitchText>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-2xl font-sans text-white/70 mb-10 md:mb-14"
        >
          This Page Hasn't Been Trained Yet
        </motion.p>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center max-w-3xl mx-auto pointer-events-auto"
        >
          {/* Home Button */}
          <Link href="/" className="w-full md:w-auto">
            <GlassCard className="group hover:scale-105 transition-all duration-300 cursor-pointer hover:border-blue-500/50">
              <div className="flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5">
                <div className="p-2 md:p-3 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Home className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-0.5">Return Home</h3>
                  <p className="text-xs md:text-sm text-white/60">Back to safety</p>
                </div>
              </div>
            </GlassCard>
          </Link>

          {/* Contact Button */}
          <Link href="/contact" className="w-full md:w-auto">
            <GlassCard className="group hover:scale-105 transition-all duration-300 cursor-pointer hover:border-purple-500/50">
              <div className="flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5">
                <div className="p-2 md:p-3 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-0.5">Contact Me</h3>
                  <p className="text-xs md:text-sm text-white/60">Get in touch</p>
                </div>
              </div>
            </GlassCard>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

// Isolated ScoreCounter component
function ScoreCounter({
  isHolding,
  setIsHolding,
  initSound,
  soundRef,
  isMuted,
  mousePosition
}: {
  isHolding: boolean;
  setIsHolding: React.Dispatch<React.SetStateAction<boolean>>;
  initSound: () => void;
  soundRef: React.RefObject<HyperspeedSound | null>;
  isMuted: boolean;
  mousePosition: { x: number; y: number };
}) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showNewHighScore, setShowNewHighScore] = useState(false);
  const scoreIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const speedMultiplierRef = useRef(1);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hyperspeed-highscore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Score increment with speed multiplier based on mouse position
  useEffect(() => {
    if (isHolding) {
      // Calculate speed multiplier based on distance from center
      const centerDist = Math.sqrt(
        Math.pow(mousePosition.x - 0.5, 2) +
        Math.pow(mousePosition.y - 0.5, 2)
      );
      speedMultiplierRef.current = 1 + centerDist * 2;

      scoreIntervalRef.current = setInterval(() => {
        setScore(prev => {
          const increment = Math.floor(speedMultiplierRef.current);
          const newScore = prev + increment;

          // Update sound speed
          if (soundRef.current && !isMuted) {
            soundRef.current.updateSpeed(speedMultiplierRef.current / 2);
          }

          return newScore;
        });
      }, 100);
    } else {
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
        scoreIntervalRef.current = null;
      }

      // Check for new high score
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('hyperspeed-highscore', score.toString());
        if (score > 0) {
          setShowNewHighScore(true);
          setTimeout(() => setShowNewHighScore(false), 2000);
        }
      }
    }
    return () => {
      if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
    };
  }, [isHolding, mousePosition, score, highScore, soundRef, isMuted]);

  const handleMouseDown = () => {
    initSound();
    setIsHolding(true);
    setScore(0);
  };

  const handleMouseUp = () => setIsHolding(false);

  return (
    <>
      {/* Invisible Click Layer for interactions */}
      <div
        className="absolute inset-0 z-[1] cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      />

      {/* Score UI */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed top-8 right-8 z-50 pointer-events-none"
      >
        <div className="glass-panel px-6 py-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <Zap className={`w-5 h-5 transition-colors duration-300 ${isHolding ? 'text-cyan-400 animate-pulse' : 'text-white/60'
              }`} />
            <div>
              <p className="text-xs text-white/40 font-light">Hyperspeed Score</p>
              <motion.p
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                key={score}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
              >
                {score.toLocaleString()}
              </motion.p>
            </div>
          </div>

          {/* High Score */}
          <div className="mt-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400/60" />
              <p className="text-xs text-white/40">
                Best: <span className="text-yellow-400">{highScore.toLocaleString()}</span>
              </p>
            </div>
          </div>

          {/* Speed Multiplier Indicator */}
          <AnimatePresence>
            {isHolding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 pt-2 border-t border-white/10"
              >
                <p className="text-xs text-cyan-400/80 font-mono">
                  Speed: x{speedMultiplierRef.current.toFixed(1)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint */}
          <AnimatePresence>
            {score === 0 && !isHolding && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-white/30 mt-2 font-light"
              >
                Click & hold to race
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* New High Score Celebration */}
      <AnimatePresence>
        {showNewHighScore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="glass-panel px-8 py-6 rounded-2xl border-2 border-yellow-400/50">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-lg font-bold text-yellow-400">New High Score!</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {score.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
