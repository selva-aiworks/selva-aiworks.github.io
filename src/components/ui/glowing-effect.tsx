"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white" | "royal";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  scale?: number;
  glowColor?: string;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.5,
    proximity = 0,
    spread = 90,
    variant = "default",
    glow = false,
    className,
    movementDuration = 0.3,
    borderWidth = 2,
    disabled = true,
    scale = 1,
    glowColor,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const currentAngleRef = useRef(0);
    const targetAngleRef = useRef(0);
    const isAnimatingRef = useRef(false);

    // Smooth animation loop using lerp
    const animateAngle = useCallback(() => {
      const element = containerRef.current;
      if (!element) return;

      const diff = targetAngleRef.current - currentAngleRef.current;

      // Normalize the difference to handle wrap-around
      let normalizedDiff = ((diff + 180) % 360) - 180;
      if (normalizedDiff < -180) normalizedDiff += 360;

      // Lerp towards target (smooth interpolation)
      const lerpFactor = 0.08; // Lower = smoother but slower
      currentAngleRef.current += normalizedDiff * lerpFactor;

      element.style.setProperty("--start", String(currentAngleRef.current));

      // Continue animation if not close enough
      if (Math.abs(normalizedDiff) > 0.1) {
        animationFrameRef.current = requestAnimationFrame(animateAngle);
      } else {
        isAnimatingRef.current = false;
      }
    }, []);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        const element = containerRef.current;
        const { left, top, width, height } = element.getBoundingClientRect();
        const mouseX = e?.x ?? lastPosition.current.x;
        const mouseY = e?.y ?? lastPosition.current.y;

        if (e) {
          lastPosition.current = { x: mouseX, y: mouseY };
        }

        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(
          mouseX - center[0],
          mouseY - center[1]
        );
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distanceFromCenter < inactiveRadius) {
          element.style.setProperty("--active", "0");
          return;
        }

        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        element.style.setProperty("--active", isActive ? "1" : "0");

        if (!isActive) return;

        // Calculate target angle
        targetAngleRef.current =
          (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

        // Start animation loop if not already running
        if (!isAnimatingRef.current) {
          isAnimatingRef.current = true;
          animationFrameRef.current = requestAnimationFrame(animateAngle);
        }
      },
      [inactiveZone, proximity, animateAngle]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    const getGradient = () => {
      if (glowColor) {
        return `conic-gradient(
          from 0deg at 50% 50%,
          ${glowColor} 0deg,
          ${glowColor}88 90deg,
          ${glowColor} 180deg,
          ${glowColor}88 270deg,
          ${glowColor} 360deg
        )`;
      }
      if (variant === "white") {
        return `conic-gradient(
          from 0deg at 50% 50%,
          rgba(255,255,255,0.8) 0deg,
          rgba(255,255,255,0.3) 90deg,
          rgba(255,255,255,0.8) 180deg,
          rgba(255,255,255,0.3) 270deg,
          rgba(255,255,255,0.8) 360deg
        )`;
      }
      if (variant === "royal") {
        return `conic-gradient(
          from 0deg at 50% 50%,
          #4f46e5 0deg,
          #7c3aed 30deg,
          #9333ea 60deg,
          #c026d3 90deg,
          #db2777 120deg,
          #e11d48 150deg,
          #ea580c 180deg,
          #f59e0b 210deg,
          #eab308 240deg,
          #84cc16 270deg,
          #10b981 300deg,
          #06b6d4 330deg,
          #4f46e5 360deg
        )`;
      }
      return `conic-gradient(
        from 0deg at 50% 50%,
        #dd7bbb 0deg,
        #d79f1e 90deg,
        #5a922c 180deg,
        #4c7894 270deg,
        #dd7bbb 360deg
      )`;
    };

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity duration-500",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--gradient": getGradient(),
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity duration-300",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              "w-full h-full",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-500 after:ease-out",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              // Smooth gradient mask with wider spread and soft edges
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),transparent_0deg,rgba(255,255,255,0.1)_calc(var(--spread)*0.3deg),rgba(255,255,255,0.5)_calc(var(--spread)*0.6deg),#fff_calc(var(--spread)*1deg),#fff_calc(var(--spread)*1deg),rgba(255,255,255,0.5)_calc(var(--spread)*1.4deg),rgba(255,255,255,0.1)_calc(var(--spread)*1.7deg),transparent_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
