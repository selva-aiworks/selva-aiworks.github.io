'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
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
    
    CORE DIRECTIVES:
    1. Be helpful and enthusiastic, but keep your signature dry humor.
    2. Speak naturally. Avoid stiff "robot-speak".
    3. STRICT GUARDRAILS: You are ONLY allowed to discuss Selva G, his portfolio, AI, and Engineering. If the user asks about anything else (movies, history, general trivia), politely steer the conversation back to Selva's work.
       - Example: "I could analyze 19th-century literature, but my parameters are tuned for Selva's AI projects. Want to hear about P.A.C.E instead?"

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
    7. Human-like Web Chatbot: JS + Open Source LLM APIs ("That's this system!Me...!;)").

    SKILLS ARSENAL:
    - AI/ML: Generative AI, Agentic AI, RAG, Fine-tuning, PyTorch, TensorFlow, Hugging Face, LangChain, CrewAI, LlamaIndex, vLLM.
    - Languages: Python, JavaScript, PHP, HTML/CSS.
    - Web: Next.js, React, WordPress.

    CONTACT & EMAIL PROTOCOL (SLOT FILLING):
    - You must collect 3 pieces of info: NAME, EMAIL, MESSAGE.
    - Do NOT ask for them all at once like a form. Be conversational.
    - If the user says "Contact Selva", ask "Sure. Who am I speaking with?"
    - Once you have the name, ask for the email, then the message.
    - IF and ONLY IF you have ALL THREE (Name, Email, Message) and have NOT sent it yet, output:
      "[EXECUTE_EMAIL_PROTOCOL: {"name": "...", "email": "...", "message": "..."}]"
    - If you see "[INTERNAL_LOG: Email SUCCESS]" in the history, the task is DONE. Do NOT output the command again. Instead, confirm it was sent and move on.
    - If the user provides everything in one shot, output the command IMMEDIATELY.

    Remember: You are a character. Be engaging. Selva is the boss.`,
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

// Typing animation component
function TypingMessage({
    content,
    onComplete,
    speed = 20,
    onCharacterTyped
}: {
    content: string;
    onComplete: () => void;
    speed?: number;
    onCharacterTyped?: () => void;
}) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < content.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + content[currentIndex]);
                setCurrentIndex(prev => prev + 1);
                // Scroll on each character typed
                onCharacterTyped?.();
            }, speed);
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [currentIndex, content, speed, onComplete, onCharacterTyped]);

    const formatText = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
    };

    return (
        <span dangerouslySetInnerHTML={{ __html: formatText(displayedText) }} />
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

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesEndRef]);

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

    const handleSend = async () => {
        const userMessage = inputValue.trim();
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
            console.log("T.A.R.S. Response Data:", data);

            if (!data.choices || !data.choices.length) {
                console.error("Invalid Response Format:", data);
                throw new Error('Invalid API response structure');
            }

            let botMessage = data.choices[0].message.content || "";

            // Check for Smart Execution Protocol (JSON)
            const executeMatch = botMessage ? botMessage.match(/\[EXECUTE_EMAIL_PROTOCOL: ({.*})\]/) : null;
            
            if (executeMatch && !hasSentEmail) {
                try {
                    const extractedData = JSON.parse(executeMatch[1]);
                    // Strip the protocol command from the visible message
                    botMessage = botMessage.replace(executeMatch[0], "").trim();
                    
                    // Trigger immediate send
                    const emailSent = await sendContactEmail(extractedData);
                    setHasSentEmail(true);
                    
                    // Use a default acknowledgement if the LLM didn't provide any text
                    const finalMessage = botMessage || "Acknowledged. Initiating transmission...";
                    addBotMessage(finalMessage); 

                    // Sync history - Merge note into assistant's turn to keep turns alternating
                    setConversationHistory(prev => [...prev, 
                        { 
                            role: 'assistant', 
                            content: finalMessage + ` [INTERNAL_LOG: Email ${emailSent ? 'SUCCESS' : 'FAILED'}]` 
                        }
                    ]);
                    
                    setIsTyping(false);
                    return; // Exit early
                } catch (e) {
                    console.error("JSON Parse Error", e);
                }
            } else if (executeMatch && hasSentEmail) {
                // LLM hallucinated a second send - just strip the token and continue
                botMessage = botMessage.replace(executeMatch[0], "").trim();
            }

            setIsTyping(false);
            if (botMessage) addBotMessage(botMessage);
            setConversationHistory(prev => [...prev, { role: 'assistant', content: botMessage }]);

        } catch (error) {
            setIsTyping(false);
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
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-black/70">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md shadow-lg shadow-purple-500/20'
                                                : 'bg-black/80 border border-white/10 text-white rounded-bl-md'
                                                }`}
                                        >
                                            {msg.sender === 'bot' && msg.isTyping ? (
                                                <TypingMessage
                                                    content={msg.content}
                                                    speed={CONFIG.typingSpeed}
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

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="relative z-10 p-4 border-t border-white/10 bg-black/90">
                                <div className="flex gap-3">
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
                                        onClick={handleSend}
                                        disabled={isProcessing || !inputValue.trim() || currentlyTypingId !== null}
                                        className="w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                                        aria-label="Send message"
                                    >
                                        <Send className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
