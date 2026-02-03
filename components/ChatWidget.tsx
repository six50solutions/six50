'use client';

import { useState, useRef, useEffect } from 'react';
// useChat import removed; using local state for chat
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: (string | undefined | null | false)[]) {
    return inputs.filter(Boolean).join(' ');
}

type LeadData = {
    name: string;
    email: string;
    phone: string;
    company: string;
    goal: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLeadCapture, setShowLeadCapture] = useState(false);
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Local state for chat input and messages
    const [localInput, setLocalInput] = useState('');
    const [localMessages, setLocalMessages] = useState<any[]>([]);

    // Use local messages as the source of truth
    const displayMessages = localMessages;

    // Input value derived from local state
    const inputValue = localInput;

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalInput(e.target.value);
    };

    // Removed legacy hook-based logic; using local state only

    const manualSubmit = async (content: string) => {
        // Optimistic update
        const userMsg = { id: Date.now().toString(), role: 'user', content };
        setLocalMessages(prev => [...prev, userMsg]);
        setLocalInput('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...displayMessages, userMsg] })
            });

            if (!response.ok) throw new Error(response.statusText);

            // Basic stream reader
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                const assistantMsg = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };
                setLocalMessages(prev => [...prev, assistantMsg]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    assistantMsg.content += chunk;

                    // Force update matching message
                    setLocalMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: assistantMsg.content } : m));
                }
            }

        } catch (e) {
            console.error("Manual submit error:", e);
            setLocalMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: 'I encountered an error connecting to the server. Please check your logs.'
            }]);
        }
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        manualSubmit(inputValue);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        // Lead capture trigger: show when user indicates intent to provide details or schedule a meeting
        const userMessages = displayMessages.filter((m: any) => m.role === 'user');
        const lastUser = userMessages[userMessages.length - 1];
        const intentPhrases = ['contact', 'schedule', 'book', 'connect', 'talk', 'call', 'meeting', 'details', 'information', 'quote', 'price', 'consultation', 'start', 'ready'];
        const userIntent = lastUser?.content && intentPhrases.some(p => lastUser.content.toLowerCase().includes(p));
        if (!leadSubmitted && !showLeadCapture) {
            if (userIntent) {
                const timer = setTimeout(() => setShowLeadCapture(true), 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [displayMessages, showLeadCapture, leadSubmitted]);

    useEffect(() => {
        // Auto-close logic: preserve history, but close window
        const lastMessage = displayMessages[displayMessages.length - 1];
        if (lastMessage?.role === 'assistant' &&
            (lastMessage.content.toLowerCase().includes('reach out') ||
                lastMessage.content.toLowerCase().includes('in touch'))) {

            // Avoid loops if we already said goodbye
            if (lastMessage.content.includes("session will end")) return;

            const closeTimer = setTimeout(() => {
                // Add closing message
                setLocalMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: "This chat session will end now."
                }]);

                // Close the widget shortly after
                setTimeout(() => {
                    setIsOpen(false);
                    setShowLeadCapture(false);
                    // Do NOT clear messages. History is preserved.
                }, 3000);
            }, 5000);
            return () => clearTimeout(closeTimer);
        }
    }, [displayMessages]);

    const toggleOpen = () => setIsOpen(!isOpen);

    const suggestedPrompts = [
        "What services do you offer?",
        "Can you help us automate workflows?",
        "We want to implement AI agents—where do we start?",
        "What does a 2–4 week assessment look like?"
    ];

    const handlePromptClick = (prompt: string) => {
        manualSubmit(prompt);
    };

    const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const lead: LeadData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            company: formData.get('company') as string,
            goal: formData.get('goal') as string,
        };
        // Send lead data to backend API
        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...lead, source: 'chat' }),
            });
            if (!res.ok) {
                console.error('Failed to send lead', await res.text());
            }
        } catch (e) {
            console.error('Error sending lead', e);
        }
        setLeadSubmitted(true);
        setShowLeadCapture(false);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans"
                        >
                            {/* Header */}
                            <div className="bg-zinc-900 text-white p-4 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <div>
                                        <h3 className="font-semibold text-sm">Dylan</h3>
                                        <p className="text-xs text-zinc-400">Strategy & Operations AI</p>
                                    </div>
                                </div>
                                <button onClick={toggleOpen} className="text-zinc-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
                                {displayMessages.length === 0 && (
                                    <div className="space-y-6 mt-4">
                                        <div className="text-center space-y-2">
                                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Welcome to six50.</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[280px] mx-auto">
                                                I can help you navigate our services, understand our methodology, or book a consultation.
                                            </p>
                                        </div>

                                        <div className="grid gap-2">
                                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-1">Suggested</p>
                                            {suggestedPrompts.map((prompt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handlePromptClick(prompt)}
                                                    className="text-left text-sm bg-white dark:bg-zinc-800 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors shadow-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-750"
                                                >
                                                    {prompt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {displayMessages.map((m: any) => (
                                    <div
                                        key={m.id}
                                        className={cn(
                                            "flex w-full mb-4",
                                            m.role === 'user' ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "max-w-[85%] rounded-2xl p-3 text-sm",
                                                m.role === 'user'
                                                    ? "bg-zinc-900 text-white rounded-tr-sm"
                                                    : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-tl-sm text-zinc-800 dark:text-zinc-100"
                                            )}
                                        >
                                            {m.content}
                                        </div>
                                    </div>
                                ))}

                                {showLeadCapture && !leadSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl space-y-3"
                                    >
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Let's connect properly.</h4>
                                            <button onClick={() => setShowLeadCapture(false)} className="text-xs text-zinc-400 hover:underline">Dismiss</button>
                                        </div>

                                        <form onSubmit={handleLeadSubmit} className="space-y-3">
                                            <input name="name" required placeholder="Name" className="w-full text-sm p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                                            <div className="grid grid-cols-2 gap-2">
                                                <input name="email" type="email" placeholder="Email" className="w-full text-sm p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                                                <input name="phone" placeholder="Phone" className="w-full text-sm p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                                            </div>
                                            <input name="company" placeholder="Company" className="w-full text-sm p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                                            <input name="goal" placeholder="What are you trying to accomplish?" className="w-full text-sm p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                                            <button type="submit" className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium py-2 rounded hover:opacity-90 transition-opacity">
                                                Submit
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Area */}
                            <form onSubmit={onFormSubmit} className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex gap-2 shrink-0">
                                <input
                                    className="flex-1 bg-transparent text-sm p-2 focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                                    value={inputValue}
                                    onChange={onInputChange}
                                    placeholder="Ask a question..."
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue?.trim()}
                                    className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={toggleOpen}
                    className="bg-gold-500 hover:bg-gold-400 text-slate-900 p-4 rounded-full shadow-2xl flex items-center gap-2 group transition-all transform hover:scale-105 active:scale-95 border-2 border-white/20"
                >
                    {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-bold">
                        {!isOpen && "Contact Dylan"}
                    </span>
                </button>
            </div>
        </>
    );
}
