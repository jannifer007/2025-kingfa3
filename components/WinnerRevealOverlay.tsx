import React from 'react';
import { Award } from '../types';

interface WinnerRevealOverlayProps {
  award: Award;
  isVisible: boolean;
}

const WinnerRevealOverlay: React.FC<WinnerRevealOverlayProps> = ({ award, isVisible }) => {
  if (!isVisible) return null;

  // Dynamic Sizing based on winner count - Increased Scale
  const count = award.winners.length;
  let containerGap = "gap-12 md:gap-16";
  let avatarSize = "w-40 h-40 md:w-56 md:h-56";
  let nameSize = "text-4xl md:text-5xl";
  let deptSize = "text-sm md:text-base";

  if (count > 4) {
      containerGap = "gap-8 md:gap-10";
      avatarSize = "w-28 h-28 md:w-36 md:h-36";
      nameSize = "text-2xl md:text-4xl";
      deptSize = "text-xs md:text-sm";
  }
  if (count > 8) {
      containerGap = "gap-4 md:gap-6";
      avatarSize = "w-20 h-20 md:w-28 md:h-28";
      nameSize = "text-xl md:text-3xl";
      deptSize = "text-[10px] md:text-xs";
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl transition-opacity duration-500"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-[1600px] mx-auto modal-enter bg-gradient-to-br from-red-900 via-red-950 to-black border-2 border-yellow-500 rounded-[3rem] shadow-[0_0_120px_rgba(234,179,8,0.4)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-bl-full pointer-events-none"></div>

        {/* Left Side: Visuals & Winners */}
        <div className="flex-1 p-8 md:p-16 flex flex-col items-center justify-center relative overflow-y-auto custom-scrollbar">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10 mb-10 shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-700 flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/50 mb-4 animate-[spin_12s_linear_infinite]">
              <i className={`fas ${award.icon} text-4xl text-red-900`}></i>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 text-center drop-shadow-md tracking-widest uppercase">
              {award.title}
            </h2>
          </div>

          <div className={`flex flex-wrap justify-center ${containerGap} w-full`}>
            {award.winners.map((winner, idx) => (
              <div key={idx} className="flex flex-col items-center group animate-[slideUp_0.6s_ease-out_backwards]" style={{animationDelay: `${idx * 0.1 + 0.3}s`}}>
                <div className="relative mb-4 transition-transform duration-300 group-hover:scale-110 animate-pop-in" style={{animationDelay: `${idx * 0.1 + 0.5}s`}}>
                  <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-spin-slow opacity-80 blur-md"></div>
                  <img 
                    src={winner.avatar} 
                    alt={winner.name} 
                    className={`relative ${avatarSize} rounded-full border-4 md:border-8 border-yellow-300 object-cover shadow-2xl`}
                  />
                  {count <= 4 && (
                      <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-red-900 text-sm font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-red-950">
                        获奖者
                      </div>
                  )}
                </div>
                <h3 className={`${nameSize} font-black text-white mb-1 drop-shadow-md`}>{winner.name}</h3>
                <p className={`${deptSize} text-yellow-500/90 font-bold tracking-widest uppercase text-center max-w-[200px]`}>{winner.department}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Citation */}
        <div className="md:w-[450px] bg-black/30 border-l border-white/10 p-12 flex flex-col justify-center relative backdrop-blur-md shrink-0">
           <i className="fas fa-quote-left text-6xl text-yellow-600/20 absolute top-12 left-12"></i>
           <i className="fas fa-quote-right text-6xl text-yellow-600/20 absolute bottom-12 right-12"></i>
           
           <h3 className="text-yellow-500 font-black mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-lg">
             <span className="w-12 h-[2px] bg-yellow-500"></span>
             颁奖词
           </h3>
           
           <p className="text-xl md:text-3xl text-yellow-50/90 leading-relaxed font-medium italic text-justify drop-shadow-sm">
             {award.citation}
           </p>
           
           <div className="mt-12 flex items-center gap-4 opacity-50">
             <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
             <div className="h-1 w-full bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default WinnerRevealOverlay;
