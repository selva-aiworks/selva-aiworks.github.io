'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Mail, Zap } from 'lucide-react';
import Link from 'next/link';
import Hyperspeed from '@/components/Hyperspeed';
import GlassCard from '@/components/GlassCard';
import GlitchText from '@/components/GlitchText';

export default function NotFound() {
  const [isHolding, setIsHolding] = useState(false);

  // Memoize options for the background animation to prevent re-initialization
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
      {/* Hyperspeed Background - Stable z-0 layer */}
      <div className="absolute inset-0 z-0 text-white">
        <Hyperspeed effectOptions={effectOptions} isSpeedingUp={isHolding} />
      </div>

      {/* Score Tracking Logic & Display isolated in its own component to prevent parent re-renders */}
      <ScoreCounter isHolding={isHolding} setIsHolding={setIsHolding} />

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
          className="text-lg md:text-2xl font-sans text-white/80 mb-8 md:mb-12"
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

// Isolated ScoreCounter component to handle game state without affecting parent background
function ScoreCounter({ 
  isHolding, 
  setIsHolding 
}: { 
  isHolding: boolean; 
  setIsHolding: React.Dispatch<React.SetStateAction<boolean>> 
}) {
  const [score, setScore] = useState(0);
  const scoreIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHolding) {
      scoreIntervalRef.current = setInterval(() => {
        setScore(prev => prev + 1);
      }, 100);
    } else {
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
        scoreIntervalRef.current = null;
      }
    }
    return () => {
      if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
    };
  }, [isHolding]);

  const handleMouseDown = () => setIsHolding(true);
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
            <Zap className={`w-5 h-5 transition-colors duration-300 ${
              isHolding ? 'text-cyan-400 animate-pulse' : 'text-white/60'
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
                {score}
              </motion.p>
            </div>
          </div>
          <AnimatePresence>
            {score === 0 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-white/30 mt-2 font-light"
              >
                Click & hold to increase your score
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
