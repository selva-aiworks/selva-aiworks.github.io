'use client';

import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  gradient?: string; // Optional gradient for specific cards
  glowColor?: string; // Optional custom glow color
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  innerClassName,
  gradient,
  glowColor,
  onClick
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative z-10 rounded-3xl border border-white/10 p-1 bg-white/5",
        "transition-all duration-300",
        onClick && "cursor-pointer hover:scale-[1.02]",
        className
      )}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
        variant="royal"
        glowColor={glowColor}
      />
      <div className={cn(
        "relative h-full w-full rounded-[20px] bg-black/20 backdrop-blur-3xl backdrop-saturate-150 border border-white/10 overflow-hidden",
        innerClassName
      )}>
        {/* Subtle gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br transition-opacity duration-500 pointer-events-none",
        gradient ? `${gradient} opacity-0 group-hover:opacity-100` : "from-white/5 to-white/0 opacity-100"
      )} />
        
        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
