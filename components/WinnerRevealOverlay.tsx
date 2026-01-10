
import React from 'react';
import { Award } from '../types';

interface WinnerRevealOverlayProps {
  award: Award;
  isVisible: boolean;
}

const WinnerRevealOverlay: React.FC<WinnerRevealOverlayProps> = ({ award, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl mx-4 modal-enter bg-gradient-to-br from-red-900 via-red-950 to-black border-2 border-yellow-500 rounded-3xl shadow-[0_0_100px_rgba(234,179,8,0.3)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full pointer-events-none"></div>

        {/* Left Side: Visuals & Winners */}
        <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          
          <div className="relative z-10 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-700 flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/50 mb-4 animate-[spin_10s_linear_infinite]">
              <i className={`fas ${award.icon} text-4xl text-red-900`}></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 text-center drop-shadow-sm tracking-wider">
              {award.title}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full">
            {award.winners.map((winner, idx) => (
              <div key={idx} className="flex flex-col items-center group animate-[slideUp_0.6s_ease-out_backwards]" style={{animationDelay: `${idx * 0.2 + 0.3}s`}}>
                <div className="relative mb-4 transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-spin-slow opacity-70 blur-sm"></div>
                  <img 
                    src={winner.avatar} 
                    alt={winner.name} 
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-300 object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-yellow-500 text-red-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    WINNER
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{winner.name}</h3>
                <p className="text-yellow-500/80 font-mono text-sm tracking-widest uppercase">{winner.department}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Citation */}
        <div className="md:w-[400px] bg-black/20 border-l border-white/10 p-8 md:p-12 flex flex-col justify-center relative backdrop-blur-sm">
           <i className="fas fa-quote-left text-4xl text-yellow-600/20 absolute top-8 left-8"></i>
           <i className="fas fa-quote-right text-4xl text-yellow-600/20 absolute bottom-8 right-8"></i>
           
           <h3 className="text-yellow-500 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
             <span className="w-8 h-[1px] bg-yellow-500"></span>
             颁奖词
           </h3>
           
           <p className="text-lg md:text-xl text-yellow-50/90 leading-relaxed font-light italic text-justify">
             {award.scripts.reveal.replace(/颁奖词：|恭喜.*?！/g, '').trim()}
           </p>
           
           <div className="mt-8 flex items-center gap-3 opacity-50">
             <div className="h-1 w-1 rounded-full bg-yellow-500"></div>
             <div className="h-1 w-full bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default WinnerRevealOverlay;
