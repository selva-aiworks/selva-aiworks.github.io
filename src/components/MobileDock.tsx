'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Folder, Mail, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';


interface MobileDockProps {
    activeSection?: string;
    onNavigate?: (section: string) => void;
}

export default function MobileDock({ activeSection = 'home', onNavigate }: MobileDockProps) {
    const menuItems = [
        {
            icon: Home,
            label: 'Home',
            section: 'home',
            isAction: false
        },
        {
            icon: Folder,
            label: 'Projects',
            section: 'projects',
            isAction: false
        },
        {
            icon: Mail,
            label: 'Contact',
            section: 'contact',
            isAction: false
        },
        {
            icon: MessageSquare,
            label: 'Chat',
            section: 'chat',
            isAction: true,
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-chatbot'));
            }
        }
    ];

    const handleNavigation = (section: string) => {
        if (onNavigate) {
            onNavigate(section);
        }
    };

    return (
        <div className="md:hidden fixed bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", damping: 20, stiffness: 300 }}
                className="relative w-full max-w-sm pointer-events-auto"
            >


                {/* Main Dock Container - Matching GlassCard styles exactly */}
                <div className="relative z-10 flex items-center justify-between px-6 py-4 rounded-[32px] bg-black/30 backdrop-blur-[60px] backdrop-saturate-200 border border-white/10 shadow-2xl overflow-hidden">

                    {/* Subtle Gradient Overlay like GlassCard */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/5 pointer-events-none" />

                    {/* Content Layer */}
                    <div className="relative z-10 flex w-full justify-between items-center px-2">
                        {menuItems.map((item) => {
                            const isActive = activeSection === item.section;
                            const Icon = item.icon;

                            return (
                                <React.Fragment key={item.label}>
                                    {item.isAction ? (
                                        <button
                                            onClick={item.onClick}
                                            className={cn(
                                                "relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group",
                                                "hover:bg-white/10 active:scale-95"
                                            )}
                                        >
                                            <Icon className="w-6 h-6 text-white/90 group-hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all ease-out" strokeWidth={1.5} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleNavigation(item.section)}
                                            className={cn(
                                                "relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500",
                                                isActive ? "bg-white/10 shadow-[inner_0_0_12px_rgba(255,255,255,0.1)]" : "hover:bg-white/5 active:scale-90"
                                            )}
                                        >
                                            <Icon className={cn(
                                                "w-6 h-6 transition-all duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
                                                isActive
                                                    ? "text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                                    : "text-white/70 hover:text-white"
                                            )} strokeWidth={1.5} />

                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeDockIndicator"
                                                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
                                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                />
                                            )}
                                        </button>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

