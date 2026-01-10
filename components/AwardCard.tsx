
import React from 'react';
import { Award } from '../types';

interface AwardCardProps {
  award: Award;
  isActive: boolean;
  isRevealed: boolean;
  onSelect: (id: string) => void;
}

const AwardCard: React.FC<AwardCardProps> = ({ award, isActive, isRevealed, onSelect }) => {
  return (
    <div 
      id={award.id}
      className={`award-card relative rounded-3xl border 
        ${isActive ? 'border-yellow-400 bg-red-900/60 shadow-[0_0_30px_rgba(251,191,36,0.3)]' : 'border-white/10 bg-black/20'}
        backdrop-blur-md overflow-hidden h-[28rem] flex flex-col items-center justify-center text-center p-8 transition-all duration-500 group hover:bg-white/5`}
    >
      {/* Icon */}
      <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-xl
        ${isRevealed ? 'bg-yellow-500 text-red-900 scale-90' : 'bg-gradient-to-br from-white/10 to-white/5 text-white/60 border border-white/10'}`}>
        <i className={`fas ${award.icon} text-5xl`}></i>
      </div>

      {/* Title */}
      <h3 className={`text-3xl font-black mb-4 transition-colors tracking-wide ${isActive ? 'text-yellow-400' : 'text-white/90'}`}>
        {award.title}
      </h3>

      {/* Description (Hidden when revealed to show winners) */}
      {!isRevealed && (
         <p className="text-lg text-white/50 line-clamp-3 px-4 leading-relaxed font-light">{award.description}</p>
      )}

      {/* Revealed State: Small Winners Display (Post-reveal history) */}
      {isRevealed && (
        <div className="flex gap-4 mt-4 animate-[fadeIn_1s]">
           {award.winners.map((winner, idx) => (
             <div key={idx} className="flex flex-col items-center" title={winner.name}>
               <img src={winner.avatar} alt={winner.name} className="w-14 h-14 rounded-full border-2 border-yellow-500/50 object-cover shadow-lg" />
               <span className="text-sm text-yellow-500 mt-2 font-bold">{winner.name}</span>
             </div>
           ))}
        </div>
      )}

      {/* Status Badge */}
      {isRevealed && (
        <div className="absolute top-4 right-4">
           <i className="fas fa-check-circle text-green-500/50 text-2xl"></i>
        </div>
      )}
    </div>
  );
};

export default AwardCard;
