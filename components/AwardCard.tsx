
import React from 'react';
import { Award } from '../types';

interface AwardCardProps {
  award: Award;
  isActive: boolean;
  isRevealed: boolean;
  onSelect: (id: string) => void;
  isSummary?: boolean;
}

const AwardCard: React.FC<AwardCardProps> = ({ award, isActive, isRevealed, onSelect, isSummary = false }) => {
  // Determine if we need compact view for many winners
  const isCompact = award.winners.length > 3;

  if (isSummary) {
    return (
      <div 
        id={award.id}
        className="relative rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 transition-all duration-500 hover:bg-white/10 hover:scale-105 group h-32"
      >
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none flex items-center justify-center">
             <i className={`fas ${award.icon} text-6xl text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-700`}></i>
        </div>
        <h3 className="relative z-10 text-lg md:text-xl font-black text-yellow-100/90 tracking-wide drop-shadow-md">
           {award.title}
        </h3>
      </div>
    );
  }

  return (
    <div 
      id={award.id}
      className={`award-card relative rounded-2xl border 
        ${isActive ? 'animate-glow-pulse bg-red-900/60' : 'border-white/10 bg-black/20'}
        backdrop-blur-md overflow-hidden h-96 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 group hover:bg-white/5`}
    >
      {/* Icon */}
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-500 shadow-xl shrink-0
        ${isRevealed ? 'bg-yellow-500 text-red-900 scale-75 mb-1' : 'bg-gradient-to-br from-white/10 to-white/5 text-white/60 border border-white/10'}`}>
        <i className={`fas ${award.icon} text-4xl`}></i>
      </div>

      {/* Title */}
      <h3 className={`text-2xl font-black mb-3 transition-colors tracking-wide ${isActive ? 'text-yellow-400' : 'text-white/90'}`}>
        {award.title}
      </h3>

      {/* Description (Hidden when revealed to show winners) */}
      {!isRevealed && (
         <p className="text-base text-white/50 line-clamp-3 px-2 leading-relaxed font-light">{award.description}</p>
      )}

      {/* Revealed State: Winners Display */}
      {isRevealed && (
        <div className={`flex flex-wrap justify-center content-center gap-1 mt-1 w-full animate-[fadeIn_1s] overflow-hidden`}>
           {award.winners.map((winner, idx) => (
             <div key={idx} className="flex flex-col items-center" title={`${winner.name} - ${winner.department}`}>
               <img 
                 src={winner.avatar} 
                 alt={winner.name} 
                 className={`${isCompact ? 'w-8 h-8' : 'w-12 h-12'} rounded-full border border-yellow-500/50 object-cover shadow-lg`} 
               />
               <span className={`text-yellow-500 font-bold ${isCompact ? 'text-[10px]' : 'text-xs'} mt-1 truncate max-w-[4rem]`}>{winner.name}</span>
             </div>
           ))}
        </div>
      )}

      {/* Status Badge */}
      {isRevealed && (
        <div className="absolute top-3 right-3">
           <i className="fas fa-check-circle text-green-500/50 text-xl"></i>
        </div>
      )}
    </div>
  );
};

export default AwardCard;
