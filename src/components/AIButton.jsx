import React, { useContext, useState } from 'react';
import DataContext from '../context/DataContest';
import { useLocation } from 'react-router-dom';

const AIButton = () => {
    const { isAIActive, setIsAIActive } = useContext(DataContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isClick, setIsClick] = useState(false);

    const location = useLocation();

    const handleClick = () => {
        setIsAIActive((p) => !p);
        setIsClick(true);
        setTimeout(setIsClick(false), 500);
    }


    return (
        <div className='fixed right-2 bottom-30 md:right-8 z-50'>
            <div className='relative group'>
                {/* Outer glow rings */}
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-40 blur-xl animate-pulse scale-150'></div>
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 opacity-30 blur-lg animate-pulse scale-125' style={{ animationDelay: '0.5s' }}></div>

                {/* Main button */}
                <button
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`
            relative w-14 h-14 md:w-16 md:h-16
            bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
            backdrop-blur-xl
            border-2 border-cyan-400/60
            rounded-full
            shadow-2xl shadow-cyan-500/30
            transition-all duration-300 ease-in-out
            hover:shadow-cyan-500/60
            hover:border-cyan-400/90
            hover:scale-110
            active:scale-95
            ${isHovered ? 'ring-4 ring-cyan-400/40' : ''}
            ${isAIActive ? 'ring-6 ring-cyan-400/60' : ''}
            touch-manipulation
            animate-bounce
          `}
                    style={{ animationDuration: '3s' }}
                >
                    {/* Inner glow */}
                    <div className='absolute inset-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20'></div>

                    {/* Animated border rings */}
                    <div className='absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping'></div>
                    <div className='absolute inset-0 rounded-full border border-purple-400/20 animate-spin' style={{ animationDuration: '4s' }}></div>

                    {/* AI Icon */}
                    <div className='relative flex items-center justify-center h-full'>
                        <div className='text-cyan-400 font-bold text-lg md:text-xl'>
                            {isAIActive ? 'X' : 'AI'}
                        </div>
                    </div>

                    {/* Scanning lines */}
                    <div className='absolute top-0 left-0 w-full h-full overflow-hidden rounded-full'>
                        <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse'></div>
                        <div className='absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse' style={{ animationDelay: '1s' }}></div>
                    </div>
                </button>

                {/* Floating particles */}
                <div className='absolute -top-2 -left-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60'></div>
                <div className='absolute -bottom-2 -right-2 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60' style={{ animationDelay: '300ms' }}></div>
                <div className='absolute top-1/2 -left-3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50' style={{ animationDelay: '500ms' }}></div>
                <div className='absolute top-1/4 -right-3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-40' style={{ animationDelay: '700ms' }}></div>

                {/* Holographic orbit rings */}
                <div className='absolute inset-0 rounded-full pointer-events-none'>
                    <div className='absolute inset-0 rounded-full border border-cyan-400/20 animate-spin' style={{ animationDuration: '6s' }}></div>
                    <div className='absolute inset-2 rounded-full border border-purple-400/15 animate-spin' style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
                    <div className='absolute inset-4 rounded-full border border-blue-400/10 animate-spin' style={{ animationDuration: '8s' }}></div>
                </div>

                {/* Hover tooltip */}
                {isHovered && (
                    <div className='absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900/90 backdrop-blur-sm border border-cyan-400/50 rounded-lg shadow-lg animate-fade-in'>
                        <div className='text-cyan-400 text-sm font-mono whitespace-nowrap'>
                            Ask AI Assistant
                        </div>
                        <div className='absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-400/50'></div>
                    </div>
                )}
                {location.pathname == '/productForm' && !isAIActive && (
                    <div className='absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900/90 backdrop-blur-sm border border-cyan-400/50 rounded-lg shadow-lg shadow-cyan-500 animate-fade-in'>
                        <div className='text-cyan-400 text-sm font-mono whitespace-nowrap'>
                            Ask AI For HSN/SAC code
                        </div>
                        <div className='absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-400/50'></div>
                    </div>
                )}

                {/* Energy waves on click */}
                {isClick && (
                    <div className='absolute inset-0 rounded-full border-4 border-cyan-400/60 animate-ping scale-150'></div>
                )}
            </div>

            {/* Background ambient glow */}
            <div className='absolute inset-0 rounded-full bg-gradient-radial from-cyan-400/10 via-transparent to-transparent scale-300 animate-pulse pointer-events-none'></div>
        </div>
    );
};

export default AIButton;