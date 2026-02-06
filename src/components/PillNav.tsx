'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export type PillNavItem = {
    label: string;
    href: string;
    ariaLabel?: string;
};

export interface PillNavProps {
    items: PillNavItem[];
    activeHref?: string;
    className?: string;
    ease?: string;
    onNavigate?: (section: string) => void;
}

const PillNav: React.FC<PillNavProps> = ({
    items,
    activeHref,
    className = '',
    ease = 'power3.easeOut',
    onNavigate
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
    const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const navItemsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach(circle => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement as HTMLElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector<HTMLElement>('.pill-label');
                const white = pill.querySelector<HTMLElement>('.pill-label-hover');

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                const index = circleRefs.current.indexOf(circle);
                if (index === -1) return;

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

                if (label) {
                    tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
                }

                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
                }

                tlRefs.current[index] = tl;
            });
        };

        layout();

        const onResize = () => layout();
        window.addEventListener('resize', onResize);

        if (document.fonts) {
            document.fonts.ready.then(layout).catch(() => { });
        }

        const menu = mobileMenuRef.current;
        if (menu) {
            gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
        }

        return () => window.removeEventListener('resize', onResize);
    }, [items, ease]);

    const handleEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease,
            overwrite: 'auto'
        });
    };

    const handleLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.2,
            ease,
            overwrite: 'auto'
        });
    };

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const hamburger = hamburgerRef.current;
        const menu = mobileMenuRef.current;

        if (hamburger) {
            const lines = hamburger.querySelectorAll('.hamburger-line');
            if (newState) {
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
            } else {
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
            }
        }

        if (menu) {
            if (newState) {
                gsap.set(menu, { visibility: 'visible' });
                gsap.fromTo(
                    menu,
                    { opacity: 0, y: 10, scaleY: 1 },
                    {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        duration: 0.3,
                        ease,
                        transformOrigin: 'top center'
                    }
                );
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    scaleY: 1,
                    duration: 0.2,
                    ease,
                    transformOrigin: 'top center',
                    onComplete: () => {
                        gsap.set(menu, { visibility: 'hidden' });
                    }
                });
            }
        }
    };

    const scrollToSection = (href: string, e: React.MouseEvent) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = href.slice(1);
            if (onNavigate) {
                onNavigate(section);
            }
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[1000]"
        >
            <nav
                className={`flex items-center justify-center ${className}`}
                aria-label="Primary"
            >
                <div
                    ref={navItemsRef}
                    className="relative items-center rounded-full hidden md:flex p-[2px] border border-white/10 bg-white/5"
                    style={{
                        height: '52px',
                    }}
                >
                    <div className="absolute inset-0 rounded-full pointer-events-none z-0">
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
                    <ul
                        role="menubar"
                        className="relative z-10 list-none flex items-stretch m-0 p-[4px] h-full gap-[4px] rounded-full bg-black/20 backdrop-blur-3xl backdrop-saturate-150 border border-white/10"
                        style={{
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
                        }}
                    >
                        {items.map((item, i) => {
                            const isActive = activeHref === item.href;

                            return (
                                <li key={item.href} role="none" className="flex h-full">
                                    <a
                                        role="menuitem"
                                        href={item.href}
                                        className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[13px] leading-[0] uppercase tracking-[0.8px] whitespace-nowrap cursor-pointer px-6 transition-all duration-300"
                                        style={{
                                            background: 'transparent',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            border: '1px solid transparent'
                                        }}
                                        aria-label={item.ariaLabel || item.label}
                                        onMouseEnter={() => handleEnter(i)}
                                        onMouseLeave={() => handleLeave(i)}
                                        onClick={(e) => scrollToSection(item.href, e)}
                                    >
                                        <span
                                            className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))',
                                                willChange: 'transform',
                                                boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), 0 0 20px rgba(147, 51, 234, 0.4)'
                                            }}
                                            aria-hidden="true"
                                            ref={el => {
                                                circleRefs.current[i] = el;
                                            }}
                                        />
                                        <span className="label-stack relative inline-block leading-[1] z-[2]">
                                            <span
                                                className="pill-label relative z-[2] inline-block leading-[1]"
                                                style={{ willChange: 'transform' }}
                                            >
                                                {item.label}
                                            </span>
                                            <span
                                                className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                                style={{
                                                    color: '#ffffff',
                                                    willChange: 'transform, opacity',
                                                    textShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                                                }}
                                                aria-hidden="true"
                                            >
                                                {item.label}
                                            </span>
                                        </span>
                                        {isActive && (
                                            <span
                                                className="absolute left-1/2 -bottom-[8px] -translate-x-1/2 w-2 h-2 rounded-full z-[4]"
                                                style={{
                                                    background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                                                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                                                }}
                                                aria-hidden="true"
                                            />
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* Mobile menu removed in favor of MobileDock */}
                <button
                    ref={hamburgerRef}
                    className="hidden" // Permanently hidden as we use MobileDock now
                    aria-hidden="true"
                />
            </nav>

            {/* Mobile menu container hidden */}
            <div className="hidden" />
        </motion.div >
    );
};

export default PillNav;
