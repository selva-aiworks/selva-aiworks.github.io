'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ScreenGlitch from './ScreenGlitch';
import MatrixRain from './MatrixRain';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from './SoundManager';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function EasterEggManager() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [aiTyping, setAiTyping] = useState('');
  const [showMatrixInfo, setShowMatrixInfo] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Exit Code Logic (bluepill)
  const [exitTyping, setExitTyping] = useState('');

  // 0. Console Secrets Log
  useEffect(() => {
    const styleTitle = 'color: #00ff41; font-family: monospace; font-size: 20px; font-weight: bold; text-shadow: 0 0 5px #00ff41;';
    const styleBody = 'color: #00ff41; font-family: monospace; font-size: 12px;';
    
    console.clear();
    console.log('%c SYSTEM TERMINAL ACCESS GRANTED ', styleTitle);
    console.log('%c\n> ACCESSING HIDDEN PROTOCOLS...\n', styleBody);
    console.log('%c----------------------------------------', styleBody);
    console.log('%c[1] MATRIX MODE:   ↑ ↑ ↓ ↓ ← → ← → B A', styleBody);
    console.log('%c[2] AI BREACH:     Type "ai"', styleBody);
    console.log('%c[3] AUDIO LINK:    Press "M" (Toggle Music)', styleBody);
    console.log('%c[4] EMERGENCY:     Typing "bluepill" (Exit Matrix)', styleBody);
    console.log('%c[5] GRAVITY:       Click "Professional Summary" Text', styleBody);
    console.log('%c----------------------------------------', styleBody);
    console.log('%c\n> WAITING FOR INPUT... _\n', styleBody);
  }, []);

  // 1. Persistence on Mount
  useEffect(() => {
    const savedState = localStorage.getItem('matrix-mode') === 'true';
    if (savedState) setIsMatrixActive(true);
  }, []);

  // 2. Sync DOM & Storage
  useEffect(() => {
    if (isMatrixActive) {
        document.body.classList.add('matrix-theme');
        localStorage.setItem('matrix-mode', 'true');
    } else {
        document.body.classList.remove('matrix-theme');
        localStorage.setItem('matrix-mode', 'false');
    }
  }, [isMatrixActive]);

  const toggleMatrix = useCallback((targetState?: boolean) => {
    setIsMatrixActive(prev => {
        const newState = targetState !== undefined ? targetState : !prev;
        
        // Sound effect logic can optionally differ here if needed
        audioManager.playSciFiBeep(); 
        
        return newState;
    });
    
    setShowMatrixInfo(true);
    setTimeout(() => setShowMatrixInfo(false), 3000);
  }, []);

  const triggerAiEffect = useCallback(() => {
    if (document.querySelector('.ai-overlay')) return;

    audioManager.playSciFiBeep();
    
    // 1. Create Base Architecture (System Messages Only - Glitch handled by Component)
    const overlay = document.createElement('div');
    overlay.className = 'ai-overlay';
    document.body.appendChild(overlay);

    const scanLine = document.createElement('div');
    scanLine.className = 'ai-scan-line';
    document.body.appendChild(scanLine);

    const msg = document.createElement('div');
    msg.className = 'ai-system-message';
    document.body.appendChild(msg);

    // CHOREOGRAPHY START
    
    // 0s: Start Overlay & Phase 1 Message
    setTimeout(() => {
        overlay.classList.add('active');
        // Using ASCII-style formatting for the calculator feel
        msg.innerHTML = 'AI&nbsp;SYSTEM&nbsp;OVERRIDE<br/><span style="font-size: 0.3em; letter-spacing: 0.1em; opacity: 0.8; font-weight: normal;">SECURITY&nbsp;BREACH&nbsp;DETECTED</span>';
        msg.classList.add('active');
    }, 10);

    // 0.5s: First Scan
    setTimeout(() => {
        scanLine.classList.add('active');
    }, 500);

    // 2.0s: Second Scan (Reset & Re-trigger)
    setTimeout(() => {
        scanLine.classList.remove('active');
        void scanLine.offsetWidth; // Force Reflow
        scanLine.classList.add('active');
    }, 2000);

    // 3.5s: Activate SCREEN GLITCH COMPONENT
    setTimeout(() => {
        scanLine.classList.remove('active');
        setGlitchActive(true); // Triggers the heavy glitch effect
    }, 3500);

    // 9.5s: Stop Glitch, Trigger BREACH OVERRIDE
    setTimeout(() => {
        setGlitchActive(false);
        msg.classList.remove('active');
        
        // Fast transition for digital feel
        setTimeout(() => {
            msg.innerHTML = 'BREACH&nbsp;OVERRIDE<br/><span style="font-size: 0.3em; letter-spacing: 0.1em; opacity: 0.8; font-weight: normal;">SYSTEM&nbsp;STABILIZED&nbsp;[OK]</span>';
            msg.classList.add('active', 'override');
        }, 150);
    }, 9500);

    // 12.5s: Final Cleanup
    setTimeout(() => {
      overlay.classList.remove('active');
      msg.classList.remove('active');
      
      setTimeout(() => {
          overlay.remove();
          msg.remove(); 
          scanLine.remove();
      }, 1000);
    }, 12500);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes(document.activeElement?.tagName.toLowerCase() || '')) return;

      // Konami Code logic
      if (e.key === KONAMI_CODE[konamiIndex]) {
        if (konamiIndex === KONAMI_CODE.length - 1) {
          toggleMatrix();
          setKonamiIndex(0);
        } else {
          setKonamiIndex(prev => prev + 1);
        }
      } else {
        setKonamiIndex(0);
      }

      const char = e.key.toLowerCase();
      // "AI" typing logic
      if (/^[a-z]$/.test(char)) {
        setAiTyping(prev => {
          const newPath = (prev + char).slice(-2);
          if (newPath === 'ai') {
            triggerAiEffect();
            return '';
          }
          return newPath;
        });

        // "Bluepill" Exit Logic
        if (isMatrixActive) {
            setExitTyping(prev => {
                 const newExit = (prev + char).slice(-8); // 'bluepill' is 8 chars
                 if (newExit === 'bluepill') {
                     toggleMatrix(false); // Explicitly Deactivate
                     return '';
                 }
                 return newExit;
            });
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            setAiTyping('');
            setExitTyping('');
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, toggleMatrix, triggerAiEffect, isMatrixActive]);


  return (
    <>
      <ScreenGlitch active={glitchActive} />
      <AnimatePresence>
        {isMatrixActive && <MatrixRain />}
        {showMatrixInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] glass-panel px-6 py-3 rounded-full"
          >
            <span className="text-sm font-mono text-[#00ff41]">
              TERMINAL MODE: {isMatrixActive ? 'ACTIVE' : 'DEACTIVATED'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
