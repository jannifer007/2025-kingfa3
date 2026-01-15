
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AWARDS, OPENING_SCRIPT } from './constants';
import { Award, BotState, CeremonyPhase } from './types';
import AwardCard from './components/AwardCard';
import Robot from './components/Robot';
import WinnerRevealOverlay from './components/WinnerRevealOverlay';

const App: React.FC = () => {
  const [phase, setPhase] = useState<CeremonyPhase>(CeremonyPhase.START_SCREEN);
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0);
  const [bgParticles, setBgParticles] = useState<number[]>([]);
  
  const [botState, setBotState] = useState<BotState>(BotState.IDLE);
  const [botPosition, setBotPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 - 50 });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const hasStartedSpeechRef = useRef(false);

  useEffect(() => {
    setBgParticles(Array.from({ length: 40 }, (_, i) => i));
    
    // Load voices
    const loadVoices = () => {
        const vs = window.speechSynthesis.getVoices();
        setVoices(vs);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const initAudio = useCallback(async () => {
    if (!outputAudioContextRef.current) {
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (outputAudioContextRef.current.state === 'suspended') {
      await outputAudioContextRef.current.resume();
    }
  }, []);

  const playStartSound = useCallback(() => {
    const ctx = outputAudioContextRef.current;
    if (!ctx) return;
    const t = ctx.currentTime;
    // Sci-fi power up sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
    osc.start(t);
    osc.stop(t + 0.4);
  }, []);

  const playRevealSound = useCallback(async () => {
    const ctx = outputAudioContextRef.current;
    if (!ctx) return;
    const t = ctx.currentTime;
    const frequencies = [261.63, 329.63, 392.00, 493.88, 587.33];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(freq, t + i * 0.08); 
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, t + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, t + i * 0.08 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 2.0);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 2.0);
    });
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel(); // Interrupt previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Priority: Specific Microsoft Voice -> Any Chinese Voice -> Default
    const targetVoice = voices.find(v => v.name === 'Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)') ||
                        voices.find(v => v.name.includes('Xiaoxiao')) ||
                        voices.find(v => v.lang === 'zh-CN') || 
                        voices.find(v => v.lang.startsWith('zh'));
    
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    utterance.rate = 1.0;
    utterance.volume = 1.0;

    // Set speaking state
    setBotState(prev => prev === BotState.CELEBRATING ? BotState.CELEBRATING : BotState.SPEAKING);

    utterance.onend = () => {
       setBotState(prev => prev === BotState.CELEBRATING ? BotState.CELEBRATING : BotState.IDLE);
    };
    
    utterance.onerror = (e) => {
       console.error("Browser TTS error:", e);
       setBotState(prev => prev === BotState.CELEBRATING ? BotState.CELEBRATING : BotState.IDLE);
    };

    window.speechSynthesis.speak(utterance);
  }, [voices]);

  const moveRobotTo = (location: 'center' | 'bottom-right' | 'top-right' | 'random') => {
    if (location === 'center') {
      setBotPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 - 50 });
      return;
    }
    if (location === 'bottom-right') {
        setBotPosition({ x: window.innerWidth - 120, y: window.innerHeight - 120 });
        return;
    }
    if (location === 'top-right') {
        setBotPosition({ x: window.innerWidth - 80, y: 120 });
        return;
    }
    if (location === 'random') {
        // Floating anywhere on screen like a bubble, keeping slight padding
        const padX = window.innerWidth * 0.1;
        const padY = window.innerHeight * 0.1;
        setBotPosition({ 
            x: padX + Math.random() * (window.innerWidth - 2 * padX), 
            y: padY + Math.random() * (window.innerHeight - 2 * padY) 
        });
        return;
    }
  };

  const handleStartInteraction = async () => {
    await initAudio();
    if (!hasStartedSpeechRef.current) {
        hasStartedSpeechRef.current = true;
        playStartSound();
        speak(OPENING_SCRIPT);
    } else {
        // If speech already started, proceed to phase change
        setPhase(CeremonyPhase.OPENING); // Using OPENING as transitional phase to grid
        // Immediately go to pre-reveal of first award after opening logic
        setTimeout(() => advanceCeremony(), 500);
    }
  };

  const advanceCeremony = async () => {
    await initAudio();
    const currentAward = AWARDS[currentAwardIndex];

    switch (phase) {
      case CeremonyPhase.START_SCREEN:
        // Handled by handleStartInteraction
        setPhase(CeremonyPhase.OPENING);
        // We stay on Opening phase briefly or move directly to Pre-Reveal logic
        // But per request, Robot starts speaking on start screen. 
        // advanceCeremony is called to Move FROM Start Screen TO Grid.
        // So here we assume user wants to see the grid now.
        setTimeout(() => {
            setPhase(CeremonyPhase.PRE_REVEAL);
            moveRobotTo('top-right');
            setBotState(BotState.MOVING);
            setTimeout(() => speak(currentAward.scripts.preReveal), 1000);
        }, 1000);
        break;

      case CeremonyPhase.OPENING:
         // Bridge phase
         setPhase(CeremonyPhase.PRE_REVEAL);
         moveRobotTo('top-right');
         setBotState(BotState.MOVING);
         speak(currentAward.scripts.preReveal);
         break;

      case CeremonyPhase.PRE_REVEAL:
        setPhase(CeremonyPhase.REVEAL);
        moveRobotTo('bottom-right'); 
        setBotState(BotState.CELEBRATING); 
        playRevealSound(); 
        triggerConfetti();
        speak(currentAward.scripts.reveal);
        break;

      case CeremonyPhase.REVEAL:
        setPhase(CeremonyPhase.POST_REVEAL);
        setBotState(BotState.CELEBRATING); 
        setTimeout(() => speak(currentAward.scripts.postReveal), 500);
        break;

      case CeremonyPhase.POST_REVEAL:
        if (currentAwardIndex < AWARDS.length - 1) {
          const nextIdx = currentAwardIndex + 1;
          setCurrentAwardIndex(nextIdx);
          setPhase(CeremonyPhase.PRE_REVEAL);
          moveRobotTo('top-right');
          setBotState(BotState.MOVING); 
          setTimeout(() => speak(AWARDS[nextIdx].scripts.preReveal), 1000);
        } else {
          setPhase(CeremonyPhase.FINISHED);
          moveRobotTo('center');
          setBotState(BotState.CELEBRATING);
          triggerConfetti();
          speak("各位同事，2025金发科技信息管理部年度颁奖盛典圆满结束！感谢大家的辛勤付出，祝大家新年快乐，龙年大吉！");
        }
        break;
        
       case CeremonyPhase.FINISHED:
          break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); 
        if (phase === CeremonyPhase.START_SCREEN) {
            handleStartInteraction();
        } else {
            advanceCeremony();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentAwardIndex, voices]); // Added voices dependency to keep closure fresh if needed

  // Full screen wandering for Idle states (Start/Finished)
  useEffect(() => {
    if (phase === CeremonyPhase.START_SCREEN || phase === CeremonyPhase.FINISHED) {
      moveRobotTo('random'); // Initial move
      const interval = setInterval(() => {
        moveRobotTo('random');
      }, 5000); // Re-position every 5 seconds
      return () => clearInterval(interval);
    }
  }, [phase]);

  const triggerConfetti = () => {
    const container = document.body;
    for (let i = 0; i < 150; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.backgroundColor = ['#fbbf24', '#f59e0b', '#dc2626', '#b91c1c', '#ffffff'][Math.floor(Math.random() * 5)];
      container.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 800 + 300;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      const animation = particle.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${vx}px, ${vy}px) rotate(720deg)`, opacity: 0 }
      ], {
        duration: 3000,
        easing: 'cubic-bezier(0, .9, .57, 1)'
      });
      animation.onfinish = () => particle.remove();
    }
  };

  return (
    <div className="min-h-screen red-gradient text-white selection:bg-yellow-500/30 overflow-hidden font-sans relative flex flex-col">
      
      {bgParticles.map(i => (
         <div 
           key={i} 
           className="bg-particle"
           style={{
             left: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 10}s`,
             width: `${Math.random() * 10 + 5}px`,
             height: `${Math.random() * 10 + 5}px`,
           }}
         ></div>
      ))}

      {phase === CeremonyPhase.START_SCREEN && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-red-950/90 backdrop-blur-md transition-opacity duration-1000">
          <div className="relative mb-12 text-center px-4">
             <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 animate-pulse"></div>
             <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-500 to-red-400 drop-shadow-2xl text-center leading-tight mb-6">
               2025 金发科技
             </h1>
             <p className="text-white text-3xl md:text-5xl font-bold tracking-widest uppercase drop-shadow-lg">
               信息管理部颁奖环节
             </p>
          </div>
          
          <button 
            onClick={handleStartInteraction}
            className="group relative mt-8 px-20 py-8 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full text-3xl font-black shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              <i className="fas fa-play text-xl"></i> 
              {hasStartedSpeechRef.current ? "进入颁奖" : "开启典礼"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      )}

      {/* Main Content Area - Grid of Awards */}
      <div className={`flex-1 flex flex-col transition-all duration-1000 ${phase === CeremonyPhase.START_SCREEN ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <header className="relative z-10 text-center pt-8 md:pt-10 mb-6">
            <div className="flex justify-center items-center gap-4 mb-2">
                <i className="fas fa-dragon text-yellow-500 text-3xl animate-pulse"></i>
                <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-xl tracking-wider">
                KINGFA 金发科技
                </h1>
                <i className="fas fa-dragon text-yellow-500 text-3xl animate-pulse scale-x-[-1]"></i>
            </div>
          </header>

          <main className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-20 content-start">
            {AWARDS.map((award, index) => (
              <AwardCard 
                key={award.id}
                award={award}
                isActive={currentAwardIndex === index && phase !== CeremonyPhase.FINISHED}
                isRevealed={index < currentAwardIndex || (index === currentAwardIndex && (phase === CeremonyPhase.REVEAL || phase === CeremonyPhase.POST_REVEAL))}
                onSelect={() => {}} 
              />
            ))}
          </main>
      </div>

      <WinnerRevealOverlay 
        award={AWARDS[currentAwardIndex]} 
        isVisible={phase === CeremonyPhase.REVEAL || phase === CeremonyPhase.POST_REVEAL} 
      />

      <Robot state={botState} position={botPosition} />

      {phase === CeremonyPhase.FINISHED && (
        <div className="fixed inset-0 z-[55] pointer-events-none flex flex-col items-center justify-center">
            <h2 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-t from-yellow-400 to-white drop-shadow-[0_0_50px_rgba(251,191,36,0.8)] animate-bounce mb-8">
                明年见！
            </h2>
        </div>
      )}
      
    </div>
  );
};

export default App;
    