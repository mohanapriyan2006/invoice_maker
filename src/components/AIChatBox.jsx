import React, { useState } from 'react';

const AIChatBox = () => {
    const [isActive, setIsActive] = useState(false);
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            console.log('Sending message:', text);
            setText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className='fixed bottom-4 md:bottom-5 left-10 right-4 md:left-50 md:right-0 flex justify-center items-center z-50 px-4'>
            <div className='relative group w-full max-w-md md:max-w-lg lg:max-w-xl'>
                {/* Floating animation container */}
                <div className='animate-bounce hover:animate-none focus:animate-none'>
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
    );
};

export default AIChatBox;