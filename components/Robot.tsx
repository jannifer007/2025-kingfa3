
import React, { useState, useEffect } from 'react';
import { BotState } from '../types';
import { ROBOT_IDLE_PHRASES } from '../constants';

interface RobotProps {
  state: BotState;
  position: { x: number; y: number };
}

const Robot: React.FC<RobotProps> = ({ state, position }) => {
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // Cycle through idle phrases
  useEffect(() => {
    if (state === BotState.SPEAKING || state === BotState.CELEBRATING) {
      setShowBubble(false);
      return;
    }

    const interval = setInterval(() => {
      const randomPhrase = ROBOT_IDLE_PHRASES[Math.floor(Math.random() * ROBOT_IDLE_PHRASES.length)];
      setBubbleText(randomPhrase);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 8000); 

    return () => clearInterval(interval);
  }, [state]);

  return (
    <div 
      className="fixed z-[100] pointer-events-none transition-all duration-[2000ms] ease-in-out"
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="animate-float relative flex flex-col items-center">
        
        {/* Interaction Bubble */}
        <div className={`speech-bubble absolute -top-40 left-1/2 -translate-x-1/2 ${showBubble ? 'show' : ''} z-50`}>
          {bubbleText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95"></div>
        </div>

        {/* Status Indicator: Hosting */}
        {state === BotState.SPEAKING && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 backdrop-blur-md border border-cyan-500/50 text-cyan-300 text-sm font-bold px-4 py-1.5 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.3)] z-50 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            小信正在主持中...
          </div>
        )}

        {/* Energy Core Glow (Softer for transparency) */}
        <div className={`absolute inset-0 blur-xl rounded-full opacity-30 transition-all duration-300 scale-125 ${state === BotState.SPEAKING ? 'bg-cyan-400 opacity-50' : 'bg-blue-400'}`}></div>
        
        {/* High-Tech Robot SVG (Semi-Transparent Glass) */}
        <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-xl">
          <defs>
            <radialGradient id="sphereGrad" cx="35%" cy="35%" r="70%">
              {/* Semi-transparent stops for glass effect */}
              <stop offset="0%" stopColor="rgba(224, 247, 250, 0.8)" />
              <stop offset="50%" stopColor="rgba(77, 208, 225, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 96, 100, 0.2)" />
            </radialGradient>
            <linearGradient id="viserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="rgba(15, 23, 42, 0.9)" />
               <stop offset="50%" stopColor="rgba(30, 41, 59, 0.8)" />
               <stop offset="100%" stopColor="rgba(15, 23, 42, 0.9)" />
            </linearGradient>
            <filter id="neonGlow">
               <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
               <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
          </defs>

          {/* Outer Holographic Rings (Rotating) - Thinner and cleaner */}
          <g opacity="0.6">
            <path d="M50 8 A42 42 0 1 1 50 92 A42 42 0 1 1 50 8" fill="none" stroke="#a5f3fc" strokeWidth="0.3" strokeDasharray="4,4">
               <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
            </path>
            <path d="M50 4 A46 46 0 1 0 50 96 A46 46 0 1 0 50 4" fill="none" stroke="#22d3ee" strokeWidth="0.2">
               <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="25s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Main Body Sphere (Glassy) */}
          <circle cx="50" cy="50" r="35" fill="url(#sphereGrad)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          
          {/* Internal Rotating Core (Visible through glass) */}
          <g transform="translate(50,50)">
             <g opacity="0.5">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
                <path d="M-12 0 L12 0 M0 -12 L0 12" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
                <circle r="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
             </g>
          </g>

          {/* Sharp Highlight for Glass effect */}
          <path d="M35 25 Q 45 18 58 22" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Visor/Face Area */}
          <path d="M26 46 Q 50 42 74 46 L 74 58 Q 50 64 26 58 Z" fill="url(#viserGrad)" stroke="#22d3ee" strokeWidth="0.5" />

          {/* Digital Eyes */}
          <g filter="url(#neonGlow)">
             {/* Left Eye */}
             <circle cx="40" cy="52" r={state === BotState.SPEAKING ? '3' : '2.5'} fill="#00e5ff">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                {state === BotState.SPEAKING && <animate attributeName="r" values="2;3.5;2" dur="0.2s" repeatCount="indefinite" />}
             </circle>
             {/* Right Eye */}
             <circle cx="60" cy="52" r={state === BotState.SPEAKING ? '3' : '2.5'} fill="#00e5ff">
                 <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                 {state === BotState.SPEAKING && <animate attributeName="r" values="2;3.5;2" dur="0.2s" repeatCount="indefinite" />}
             </circle>
          </g>

          {/* Mouth Visualization (Audio Wave) */}
          {state === BotState.SPEAKING && (
              <g stroke="#00e5ff" strokeWidth="1.2" strokeLinecap="round" filter="url(#neonGlow)">
                  <line x1="45" y1="60" x2="55" y2="60">
                     <animate attributeName="y1" values="60;58;60" dur="0.2s" repeatCount="indefinite" />
                     <animate attributeName="y2" values="60;58;60" dur="0.2s" repeatCount="indefinite" />
                  </line>
                   <line x1="39" y1="60" x2="43" y2="60">
                     <animate attributeName="y1" values="60;59;60" dur="0.2s" repeatCount="indefinite" />
                     <animate attributeName="y2" values="60;59;60" dur="0.2s" repeatCount="indefinite" />
                  </line>
                   <line x1="57" y1="60" x2="61" y2="60">
                     <animate attributeName="y1" values="60;59;60" dur="0.2s" repeatCount="indefinite" />
                     <animate attributeName="y2" values="60;59;60" dur="0.2s" repeatCount="indefinite" />
                  </line>
              </g>
          )}

          {/* Ear Antennae */}
          <path d="M23 48 L16 46" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="46" r="1.5" fill="#22d3ee" />
          <path d="M77 48 L84 46" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="84" cy="46" r="1.5" fill="#22d3ee" />

          {/* Sign (Celebration Mode) */}
          <g className={`transition-all duration-500 ease-out origin-bottom ${state === BotState.CELEBRATING ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} transform="translate(75, 10) rotate(10)">
             {/* Stick */}
             <line x1="25" y1="28" x2="25" y2="55" stroke="#b45309" strokeWidth="3" />
             {/* Board */}
             <rect x="0" y="0" width="50" height="30" rx="4" fill="#fbbf24" stroke="#78350f" strokeWidth="2" className="drop-shadow-md" />
             <text x="25" y="20" textAnchor="middle" fill="#450a0a" fontSize="14" fontWeight="900" style={{fontFamily: 'sans-serif'}}>恭喜</text>
             {/* Glint on sign */}
             <path d="M5 5 L20 5 L5 20 Z" fill="rgba(255,255,255,0.4)" />
          </g>

        </svg>
      </div>
    </div>
  );
};

export default Robot;
