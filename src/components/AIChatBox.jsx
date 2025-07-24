import React, { useContext, useEffect, useState } from 'react';
import gemini from '../API/AiAPI';
import aiI from '../assets/ai-logo.png'
import DataContext from '../context/DataContest';
import { formatDataForAI } from '../context/formatDataForAI';

const AIChatBox = () => {

    const [isActive, setIsActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [showChat, setShowChat] = useState(false);

    
    const {
        yourCompanies,
        yourProducts,
        yourCustomers,
        yourInvoices,
    } = useContext(DataContext);

    const [aiReadyContext, setAiReadyContext] = useState("");

    useEffect(() => {
        if (
            yourCompanies?.length &&
            yourProducts?.length &&
            yourCustomers?.length &&
            yourInvoices?.length
        ) {
            const formattedContext = formatDataForAI(
                yourCompanies,
                yourProducts,
                yourCustomers,
                yourInvoices
            );
            setAiReadyContext(formattedContext);
        }
    }, [yourCompanies, yourProducts, yourCustomers, yourInvoices]);



    const handleSend = async () => {
        if (!text.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            text: text.trim(),
            sender: "user",
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setText("");
        setShowChat(true);

        const isFirstMessage = messages.length === 0;

        const history = [
            ...(isFirstMessage
                ? [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are Mobius, an AI assistant like in the Loki series. Your job is to help users manage their invoicing business.\n\nBelow is all business data:\n\n${aiReadyContext}`,
                            },
                        ],
                    },
                ]
                : []),
            ...[...messages, newUserMessage].map((msg) => ({
                role: msg.sender === "user" ? "user" : "model",
                parts: [{ text: msg.text }],
            })),
        ];

        const aiResponse = {
            id: Date.now() + 1,
            text: "Mobius AI is thinking...",
            sender: "ai",
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiResponse]);

        try {
            const result = await gemini(history);

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === aiResponse.id ? { ...msg, text: result } : msg
                )
            );
        } catch (err) {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === aiResponse.id
                        ? { ...msg, text: "Mobius couldn't process your message." }
                        : msg
                )
            );
            console.error("Gemini error:", err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>

            <div className='fixed bottom-4 md:bottom-5 left-10 right-4 md:left-50 md:right-0 flex justify-center items-center z-50 px-4'>
                {showChat && (
                    <div className="absolute bottom-12 md:bottom-18 left-0 right-0 w-full max-w-2xl mx-auto">
                        {/* Chat Space Container */}
                        <div className="bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 max-h-96 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-cyan-400/20">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                                    <span className="text-cyan-400 font-mono text-sm"><strong>Mobius</strong> AI Assistant</span>
                                </div>
                                <button
                                    onClick={() => setShowChat(false)}
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Messages Container */}
                            <div className="p-4 space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400/20 scrollbar-track-transparent">
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {message.sender != 'user' && <div className='relative'>
                                            <img src={aiI} className='h-10 w-8 mr-2 md:block hidden' alt='ai' />
                                            <div className={`absolute inset-0 rounded-2xl ${message.sender != 'user' ? 'bg-cyan-400/50' : 'bg-cyan-400/10'} blur-lg h-12 -z-10`}></div>
                                        </div>}
                                        <div className={`
                            max-w-xs px-4 py-2 rounded-2xl relative
                            ${message.sender != 'user'
                                                ? 'bg-gradient-to-r from-cyan-800 to-blue-700 text-white  border border-cyan-400/50 mr-8 '
                                                : 'bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-cyan-100 border border-cyan-400/20  ml-8'
                                            }
                        `}>
                                            {/* Message bubble glow effect */}
                                            <div className={`absolute inset-0 rounded-2xl ${message.sender != 'user' ? 'bg-cyan-400/40' : 'bg-cyan-400/10'} blur-sm -z-10`}></div>

                                            <p className="text-sm relative z-10">{message.text}</p>
                                            <span className="text-xs opacity-70 block mt-1">{message.timestamp}</span>

                                            {/* AI typing indicator */}
                                            {message.sender === 'ai' && message.text.includes('processing') && (
                                                <div className="flex space-x-1 mt-2">
                                                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                                                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-pulse pointer-events-none"></div>
                        </div>

                        {/* Floating particles around chat */}
                        <div className="absolute -top-2 -left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                        <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '400ms' }}></div>
                        <div className="absolute top-1/2 -right-4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '600ms' }}></div>
                    </div>
                )}
                <div className='relative group w-full max-w-md md:max-w-lg lg:max-w-xl'>
                    {/* Floating animation container */}
                    <div className={`animate-bounce hover:animate-none focus:animate-none ${showChat ? 'animate-none' : ''}`}>
                        {/* Outer glow ring */}
                        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-lg animate-pulse scale-110 pointer-events-none'></div>

                        {/* Main chat container */}
                        <div className={`
            relative w-full h-12 md:h-16 
            bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 
            backdrop-blur-xl 
            border-2 border-cyan-400/50 
            rounded-full 
            shadow-2xl 
            shadow-cyan-500/25
            transition-all duration-300 ease-in-out
            hover:shadow-cyan-500/50 
            hover:border-cyan-400/80
            hover:scale-105
            ${isActive ? 'ring-4 ring-cyan-400/30' : ''}
          `}>
                            {/* Inner glow effect */}
                            <div className='absolute inset-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 pointer-events-none'></div>

                            {/* Animated border pulse */}
                            <div className='absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping pointer-events-none'></div>

                            {/* Content container */}
                            <div className='relative flex items-center h-full px-3 md:px-6 z-10'>
                                {/* AI indicator */}
                                <div className='flex items-center mr-2 md:mr-4'>
                                    <div className='w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse mr-1 md:mr-2'></div>
                                    <span className='text-cyan-400 text-xs md:text-sm font-mono hidden sm:inline'>AI</span>
                                </div>

                                {/* Input field */}
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onFocus={() => setIsActive(true)}
                                    onBlur={() => setIsActive(false)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Message AI..."
                                    className='
                  flex-1 bg-transparent 
                  text-white placeholder-gray-400 
                  outline-none border-none
                  font-mono text-xs md:text-sm
                  tracking-wide
                  z-20
                  touch-manipulation
                '
                                    style={{ WebkitAppearance: 'none' }}
                                />

                                {/* Send button */}
                                <button
                                    onClick={handleSend}
                                    disabled={!text.trim()}
                                    className='
                  ml-2 md:ml-4 w-8 h-8 md:w-10 md:h-10 
                  bg-gradient-to-r from-cyan-500 to-blue-600 
                  hover:from-cyan-400 hover:to-blue-500
                  disabled:from-gray-600 disabled:to-gray-700
                  disabled:opacity-50 disabled:cursor-not-allowed
                  rounded-full 
                  flex items-center justify-center
                  transition-all duration-200
                  hover:scale-110
                  active:scale-95
                  shadow-lg shadow-cyan-500/30
                  group-hover:shadow-cyan-500/50
                  z-20
                  touch-manipulation
                '
                                >
                                    <svg
                                        className='w-3 h-3 md:w-5 md:h-5 text-white'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                                    </svg>
                                </button>
                            </div>

                            {/* Scanning line animation */}
                            <div className='absolute top-0 left-0 w-full h-full overflow-hidden rounded-full pointer-events-none'>
                                <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse'></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating particles effect */}
                    <div className='absolute -top-1 -left-1 md:-top-2 md:-left-2 w-1 h-1 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-ping opacity-60 pointer-events-none'></div>
                    <div className='absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-0.5 h-0.5 md:w-1 md:h-1 bg-purple-400 rounded-full animate-ping opacity-60 pointer-events-none' style={{ animationDelay: '300ms' }}></div>
                    <div className='absolute top-1/2 -left-2 md:-left-4 w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50 pointer-events-none' style={{ animationDelay: '500ms' }}></div>

                    {/* Holographic grid background */}
                    <div className='absolute inset-0 rounded-full opacity-20 pointer-events-none'>
                        <div className='absolute inset-0 rounded-full border border-cyan-400/20 animate-spin' style={{ animationDuration: '8s' }}></div>
                        <div className='absolute inset-2 rounded-full border border-purple-400/20 animate-spin' style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AIChatBox;