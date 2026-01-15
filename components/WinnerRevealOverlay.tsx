
import React from 'react';
import { Award } from '../types';

interface WinnerRevealOverlayProps {
  award: Award;
  isVisible: boolean;
}

const WinnerRevealOverlay: React.FC<WinnerRevealOverlayProps> = ({ award, isVisible }) => {
  if (!isVisible) return null;

  // Dynamic Sizing based on winner count
  const count = award.winners.length;
  let containerGap = "gap-8 md:gap-12";
  let avatarSize = "w-32 h-32 md:w-40 md:h-40";
  let nameSize = "text-2xl md:text-3xl";

  if (count > 4) {
      containerGap = "gap-4 md:gap-6";
      avatarSize = "w-24 h-24 md:w-28 md:h-28";
      nameSize = "text-xl md:text-2xl";
  }
  if (count > 8) {
      containerGap = "gap-3 md:gap-4";
      avatarSize = "w-16 h-16 md:w-20 md:h-20";
      nameSize = "text-lg md:text-xl";
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-6xl mx-4 modal-enter bg-gradient-to-br from-red-900 via-red-950 to-black border-2 border-yellow-500 rounded-3xl shadow-[0_0_100px_rgba(234,179,8,0.3)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full pointer-events-none"></div>

        {/* Left Side: Visuals & Winners */}
        <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center relative overflow-y-auto custom-scrollbar">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 mb-6 shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-700 flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/50 mb-2 animate-[spin_10s_linear_infinite]">
              <i className={`fas ${award.icon} text-3xl text-red-900`}></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 text-center drop-shadow-sm tracking-wider">
              {award.title}
            </h2>
          </div>

          <div className={`flex flex-wrap justify-center ${containerGap} w-full`}>
            {award.winners.map((winner, idx) => (
              <div key={idx} className="flex flex-col items-center group animate-[slideUp_0.6s_ease-out_backwards]" style={{animationDelay: `${idx * 0.1 + 0.3}s`}}>
                <div className="relative mb-2 transition-transform duration-300 group-hover:scale-105 animate-pop-in" style={{animationDelay: `${idx * 0.1 + 0.5}s`}}>
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-spin-slow opacity-70 blur-sm"></div>
                  <img 
                    src={winner.avatar} 
                    alt={winner.name} 
                    className={`relative ${avatarSize} rounded-full border-2 md:border-4 border-yellow-300 object-cover shadow-2xl`}
                  />
                  {count <= 4 && (
                      <div className="absolute -bottom-3 -right-3 bg-yellow-500 text-red-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        WINNER
                      </div>
                  )}
                </div>
                <h3 className={`${nameSize} font-bold text-white mb-0.5`}>{winner.name}</h3>
                <p className="text-yellow-500/80 font-mono text-xs md:text-sm tracking-widest uppercase text-center max-w-[150px]">{winner.department.split(' · ')[0]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Citation */}
        <div className="md:w-[350px] bg-black/20 border-l border-white/10 p-8 flex flex-col justify-center relative backdrop-blur-sm shrink-0">
           <i className="fas fa-quote-left text-4xl text-yellow-600/20 absolute top-8 left-8"></i>
           <i className="fas fa-quote-right text-4xl text-yellow-600/20 absolute bottom-8 right-8"></i>
           
           <h3 className="text-yellow-500 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
             <span className="w-8 h-[1px] bg-yellow-500"></span>
             颁奖词
           </h3>
           
           <p className="text-lg text-yellow-50/90 leading-relaxed font-light italic text-justify">
             {award.citation}
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
