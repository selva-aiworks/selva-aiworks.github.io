'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Centralised sound manager using Web Audio API
class AudioManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private droneOscillators: any[] = []; 
  private masterGain: GainNode | null = null;
  private melodyTimeout: NodeJS.Timeout | null = null;
  private chordInterval: NodeJS.Timeout | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.ctx;
  }

  async resume() {
    const ctx = this.initCtx();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) {
      this.initCtx();
      this.resume().then(() => {
        this.playStartGlissando();
        this.startAmbience();
      });
    } else {
      this.stopAmbience();
    }
  }

  private playStartGlissando() {
    if (!this.ctx) return;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C4 chord glissando
    notes.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx!.currentTime + i * 0.05);
      g.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.05);
      g.gain.linearRampToValueAtTime(0.08, this.ctx!.currentTime + i * 0.05 + 0.1);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + i * 0.05 + 2);
      osc.connect(g);
      g.connect(this.ctx!.destination);
      osc.start(this.ctx!.currentTime + i * 0.05);
      osc.stop(this.ctx!.currentTime + i * 0.05 + 2);
    });
  }

  private startAmbience() {
    const ctx = this.initCtx();
    this.stopAmbience();

    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 5); 
    this.masterGain.connect(ctx.destination);

    // --- 1. Organic "String" Pad (Chord Progression) ---
    // Two beautiful, airy chords: Cmaj9 and Fmaj9
    const chord1 = [130.81, 164.81, 196.00, 246.94, 293.66]; // Cmaj9
    const chord2 = [174.61, 220.00, 261.63, 329.63, 349.23]; // Fmaj9
    let currentChord = chord1;

    const padNodes: { o: OscillatorNode, g: GainNode }[] = [];
    currentChord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine'; // Pure sines for warmth
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 4);
        osc.connect(g);
        g.connect(this.masterGain!);
        osc.start();
        padNodes.push({ o: osc, g: g });
        this.droneOscillators.push(osc, g);
    });

    // Chord rotation logic every 10 seconds
    const rotateChord = () => {
        if (!this.enabled || !this.ctx) return;
        currentChord = currentChord === chord1 ? chord2 : chord1;
        padNodes.forEach((node, i) => {
            const freq = currentChord[i] || currentChord[0];
            node.o.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 6);
        });
        this.chordInterval = setTimeout(rotateChord, 10000);
    };
    this.chordInterval = setTimeout(rotateChord, 10000);

    // --- 2. Pleasant Harp/Bell Layer (Generative) ---
    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66]; // C Major Pentatonic
    const playHarpNote = () => {
        if (!this.enabled || !this.ctx || !this.masterGain) return;
        
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        // Pluck envelope (fast attack, slow decay)
        g.gain.setValueAtTime(0, this.ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4);
        
        // Add a master filter to the harp notes for soft texture
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(1500, this.ctx.currentTime);
        
        osc.connect(g);
        g.connect(lp);
        lp.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 4.5);
        
        const nextTime = 2000 + Math.random() * 4000;
        this.melodyTimeout = setTimeout(playHarpNote, nextTime);
    };
    playHarpNote();
  }

  private stopAmbience() {
    if (!this.ctx || !this.masterGain) return;
    
    const currentGain = this.masterGain;
    const currentOscs = [...this.droneOscillators];
    
    if (this.melodyTimeout) clearTimeout(this.melodyTimeout);
    if (this.chordInterval) clearTimeout(this.chordInterval);
    
    currentGain.gain.cancelScheduledValues(this.ctx.currentTime);
    currentGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2.5);
    
    setTimeout(() => {
      currentOscs.forEach(o => {
        try { 
            if (o.stop) o.stop(); 
            if (o.disconnect) o.disconnect();
        } catch(e) {}
      });
    }, 3000);

    this.droneOscillators = [];
    this.masterGain = null;
    this.melodyTimeout = null;
    this.chordInterval = null;
  }

  playSciFiBeep() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playHover() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(330, this.ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playToggle(enabled: boolean) {
    const ctx = this.initCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    if (enabled) {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
    } else {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
    }
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }
}

export const audioManager = new AudioManager();

export default function SoundManager() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sound-enabled') === 'true';
    if (savedState) {
        setSoundEnabled(true);
        audioManager.setEnabled(true);
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newState = !prev;
      audioManager.setEnabled(newState);
      audioManager.playToggle(newState);
      localStorage.setItem('sound-enabled', String(newState));
      return newState;
    });
    
    setShowNotification(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowNotification(false), 2000);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        // Prevent if in input fields
        if (['input', 'textarea'].includes(document.activeElement?.tagName.toLowerCase() || '')) return;
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleSound]);

  // Global interaction listener to resume AudioContext (browser requirement)
  useEffect(() => {
    if (!soundEnabled) return;

    const handleInteraction = () => {
      audioManager.resume();
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [soundEnabled]);

  // Global click/hover listeners to play sounds if enabled
  useEffect(() => {
    if (!soundEnabled) return;

    const handleClick = () => audioManager.playSciFiBeep();
    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button, a, .glass-panel')) {
            audioManager.playHover();
        }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [soundEnabled]);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-24 right-8 z-[100] glass-panel px-4 py-3 rounded-full flex items-center gap-3 pointer-events-none"
        >
          {soundEnabled ? (
            <Volume2 className="text-blue-400 w-5 h-5" />
          ) : (
            <VolumeX className="text-white/40 w-5 h-5" />
          )}
          <span className="text-sm font-medium text-white/90">
            Ambience {soundEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
