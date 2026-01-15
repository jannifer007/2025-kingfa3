
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AWARDS, OPENING_SCRIPT, MUSIC_PATHS } from './constants';
import { Award, BotState, CeremonyPhase } from './types';
import AwardCard from './components/AwardCard';
import Robot from './components/Robot';
import WinnerRevealOverlay from './components/WinnerRevealOverlay';
import VoiceSettings, { VoiceConfig } from './components/VoiceSettings';

const App: React.FC = () => {
  const [phase, setPhase] = useState<CeremonyPhase>(CeremonyPhase.START_SCREEN);
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0);
  const [bgParticles, setBgParticles] = useState<number[]>([]);
  
  const [botState, setBotState] = useState<BotState>(BotState.IDLE);
  const [botPosition, setBotPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 - 50 });
  
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const hasStartedSpeechRef = useRef(false);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Music Refs - Only Main BGM
  const mainBgmRef = useRef<HTMLAudioElement | null>(null);

  // Volume Constants
  const BGM_VOLUME_NORMAL = 0.15; // Reduced base volume
  const BGM_VOLUME_LOW = 0.09;    // Volume while speaking (ducking)

  // Voice Configuration State
  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({
    browserVoiceURI: ''
  });

  const safePlay = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Suppress errors about missing files or autoplay policies
        console.debug("Audio playback prevented or failed:", error.message);
      });
    }
  };

  const safePause = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    try {
        audio.pause();
    } catch (e) {
        console.debug("Audio pause error:", e);
    }
  };

  useEffect(() => {
    setBgParticles(Array.from({ length: 40 }, (_, i) => i));

    // Initialize Music with error handling
    const initMusic = (path: string, volume: number) => {
        const audio = new Audio(path);
        audio.loop = true;
        audio.volume = volume;
        audio.onerror = (e) => {
            console.debug(`Failed to load audio: ${path}`, e);
        };
        return audio;
    };

    // Initialize with the lower normal volume
    mainBgmRef.current = initMusic(MUSIC_PATHS.MAIN_BGM, BGM_VOLUME_NORMAL);
    
    // Initial browser voice setup
    const initVoice = () => {
       const voices = window.speechSynthesis.getVoices();
       if (voices.length > 0 && !voiceConfig.browserVoiceURI) {
          // Priority: Microsoft Xiaoxiao -> Google Chinese -> Any Zh -> First
          const defaultVoice = voices.find(v => v.name.includes('Xiaoxiao')) || 
                             voices.find(v => v.name.includes('Google') && v.lang.toLowerCase().includes('zh')) ||
                             voices.find(v => v.lang === 'zh-CN') || 
                             voices.find(v => v.lang.toLowerCase().startsWith('zh')) || 
                             voices[0];
          if (defaultVoice) {
            setVoiceConfig({ browserVoiceURI: defaultVoice.voiceURI });
          }
       }
    };
    initVoice();
    window.speechSynthesis.onvoiceschanged = initVoice;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      window.speechSynthesis.onvoiceschanged = null;
      // Cleanup Audio
      safePause(mainBgmRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const speak = useCallback((text: string, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    
    // Duck BGM: Lower volume when speaking starts
    if (mainBgmRef.current) {
        mainBgmRef.current.volume = BGM_VOLUME_LOW;
    }

    setBotState(prev => prev === BotState.CELEBRATING ? BotState.CELEBRATING : BotState.SPEAKING);
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Store in ref
    currentUtteranceRef.current = utterance;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => v.voiceURI === voiceConfig.browserVoiceURI);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = 1.0;
    utterance.volume = 1.0; // Max volume for speech
    
    utterance.onend = () => {
      // Restore BGM: Raise volume when speaking ends
      if (mainBgmRef.current) {
          mainBgmRef.current.volume = BGM_VOLUME_NORMAL;
      }
      
      setBotState(prev => prev === BotState.CELEBRATING ? BotState.CELEBRATING : BotState.IDLE);
      currentUtteranceRef.current = null;
      if (onEnd) onEnd();
    };
    
    utterance.onerror = (e) => {
        // If interrupted, we don't necessarily restore volume yet because the next speech will start immediately
        // But if it's a real error, we should restore.
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
            if (mainBgmRef.current) {
                mainBgmRef.current.volume = BGM_VOLUME_NORMAL;
            }
            console.error("TTS Error:", e.error);
        }

        if (e.error === 'interrupted' || e.error === 'canceled') {
          return;
        }
        
        setBotState(prev => prev === BotState.CELEBRATING ? BotState.CELEBRATING : BotState.IDLE);
        currentUtteranceRef.current = null;
    };
    
    window.speechSynthesis.speak(utterance);
  }, [voiceConfig, BGM_VOLUME_NORMAL, BGM_VOLUME_LOW]);

  const moveRobotTo = (location: 'center' | 'bottom-right' | 'random') => {
    if (location === 'center') {
      setBotPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 - 50 });
      return;
    }
    if (location === 'bottom-right') {
        setBotPosition({ x: window.innerWidth - 120, y: window.innerHeight - 120 });
        return;
    }
    if (location === 'random') {
        // Floating Bubble Logic:
        // Keep robot within the central 60% of the screen (20% margin) to avoid edges.
        const marginX = window.innerWidth * 0.2;
        const marginY = window.innerHeight * 0.15;
        
        setBotPosition({ 
            x: marginX + Math.random() * (window.innerWidth - 2 * marginX), 
            y: marginY + Math.random() * (window.innerHeight - 2 * marginY) 
        });
        return;
    }
  };

  const handleStartInteraction = async () => {
    await initAudio();
    
    // Start Main BGM
    // Only play if it is paused to avoid errors
    if (mainBgmRef.current && mainBgmRef.current.paused) {
        safePlay(mainBgmRef.current);
    }

    if (!hasStartedSpeechRef.current) {
        hasStartedSpeechRef.current = true;
        playStartSound();
        speak(OPENING_SCRIPT);
    } else {
        setPhase(CeremonyPhase.OPENING);
        setTimeout(() => advanceCeremony(), 500);
    }
  };

  const advanceCeremony = async () => {
    await initAudio();
    const currentAward = AWARDS[currentAwardIndex];

    switch (phase) {
      case CeremonyPhase.START_SCREEN:
        // Transition from Start -> Opening
        setPhase(CeremonyPhase.OPENING);
        // Main BGM should already be playing from handleStartInteraction
        setTimeout(() => {
            setPhase(CeremonyPhase.PRE_REVEAL);
            moveRobotTo('random'); // Moves to a random floating spot
            setBotState(BotState.MOVING);
            setTimeout(() => speak(currentAward.scripts.preReveal), 1000);
        }, 1000);
        break;

      case CeremonyPhase.OPENING:
         setPhase(CeremonyPhase.PRE_REVEAL);
         moveRobotTo('random'); // Moves to a random floating spot
         setBotState(BotState.MOVING);
         // Ensure Main BGM is playing
         if (mainBgmRef.current && mainBgmRef.current.paused) safePlay(mainBgmRef.current);
         speak(currentAward.scripts.preReveal);
         break;

      case CeremonyPhase.PRE_REVEAL:
        // Main BGM continues loop
        setPhase(CeremonyPhase.REVEAL);
        moveRobotTo('bottom-right'); // Stays at bottom right for reveal to not block content
        setBotState(BotState.CELEBRATING); 
        playRevealSound(); 
        triggerConfetti();
        
        speak(currentAward.scripts.reveal, () => {
            // Callback empty, music continues
        });
        break;

      case CeremonyPhase.REVEAL:
        // Main BGM continues loop
        setPhase(CeremonyPhase.POST_REVEAL);
        setBotState(BotState.CELEBRATING); 
        setTimeout(() => speak(currentAward.scripts.postReveal), 500);
        break;

      case CeremonyPhase.POST_REVEAL:
        if (currentAwardIndex < AWARDS.length - 1) {
          const nextIdx = currentAwardIndex + 1;
          setCurrentAwardIndex(nextIdx);
          setPhase(CeremonyPhase.PRE_REVEAL);
          moveRobotTo('random'); // Moves to a random floating spot
          setBotState(BotState.MOVING); 
          // Main BGM continues playing
          setTimeout(() => speak(AWARDS[nextIdx].scripts.preReveal), 1000);
        } else {
          setPhase(CeremonyPhase.FINISHED);
          moveRobotTo('random'); // Keep it floating
          setBotState(BotState.CELEBRATING);
          triggerConfetti();
          speak("各位同事，2025金发科技信息管理部年度颁奖盛典圆满礼成！再次祝贺所有获奖的伙伴，你们是我们的骄傲！感谢大家的辛勤付出，亲切地祝大家2026马年大吉，万事如意，马到成功！");
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
  }, [phase, currentAwardIndex, speak]);

  useEffect(() => {
    if (phase === CeremonyPhase.START_SCREEN || phase === CeremonyPhase.FINISHED) {
      moveRobotTo('random');
      const interval = setInterval(() => {
        moveRobotTo('random');
      }, 5000);
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

  // Pagination & Display Logic
  const ITEMS_PER_PAGE = 6;
  const isFinished = phase === CeremonyPhase.FINISHED;
  const visibleStart = Math.floor(currentAwardIndex / ITEMS_PER_PAGE) * ITEMS_PER_PAGE;
  
  // When finished, show all awards. Otherwise show the current page.
  const visibleAwards = isFinished ? AWARDS : AWARDS.slice(visibleStart, visibleStart + ITEMS_PER_PAGE);

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
      <div className={`flex-1 flex flex-col justify-center transition-all duration-1000 ${phase === CeremonyPhase.START_SCREEN ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <header className="relative z-10 text-center pt-4 mb-4 shrink-0">
            <div className="flex justify-center items-center gap-4">
                <i className="fas fa-dragon text-yellow-500 text-3xl animate-pulse"></i>
                <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-xl tracking-wider">
                KINGFA 金发科技
                </h1>
                <i className="fas fa-dragon text-yellow-500 text-3xl animate-pulse scale-x-[-1]"></i>
            </div>
          </header>

          <main className={`relative z-10 w-full max-w-[1600px] mx-auto grid 
            ${isFinished 
                ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 content-center h-full overflow-hidden py-4' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 content-center h-full max-h-[90vh]'
            } px-8`}>
            {visibleAwards.map((award, index) => {
              // Calculate global index
              const globalIndex = isFinished ? index : visibleStart + index;
              return (
                <AwardCard 
                  key={award.id}
                  award={award}
                  isActive={currentAwardIndex === globalIndex && !isFinished}
                  isRevealed={isFinished || globalIndex < currentAwardIndex || (globalIndex === currentAwardIndex && (phase === CeremonyPhase.REVEAL || phase === CeremonyPhase.POST_REVEAL))}
                  onSelect={() => {}} 
                  isSummary={isFinished}
                />
              );
            })}
          </main>
      </div>

      <WinnerRevealOverlay 
        award={AWARDS[currentAwardIndex]} 
        isVisible={phase === CeremonyPhase.REVEAL || phase === CeremonyPhase.POST_REVEAL} 
      />

      <Robot state={botState} position={botPosition} />
      
      {/* Settings Panel */}
      <VoiceSettings 
        config={voiceConfig} 
        onConfigChange={setVoiceConfig}
        onTest={(text) => speak(text)}
      />

    </div>
  );
};

export default App;
