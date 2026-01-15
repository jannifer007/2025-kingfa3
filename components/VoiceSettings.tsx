
import React, { useState, useEffect } from 'react';

export interface VoiceConfig {
  browserVoiceURI: string;
}

interface VoiceSettingsProps {
  config: VoiceConfig;
  onConfigChange: (config: VoiceConfig) => void;
  onTest: (text: string) => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ config, onConfigChange, onTest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Filter for Chinese voices (Mainland, HK, TW, SG)
      const zhVoices = allVoices.filter(v => 
        v.lang.toLowerCase().includes('zh') || 
        v.lang.toLowerCase().includes('cn') || 
        v.lang.toLowerCase().includes('hk') || 
        v.lang.toLowerCase().includes('tw')
      );
      // If we found Chinese voices, show them. Otherwise show all voices.
      setVoices(zhVoices.length > 0 ? zhVoices : allVoices);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[90] w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur flex items-center justify-center transition-all shadow-lg border border-white/10 hover:scale-110 group"
        title="语音设置"
      >
        <i className="fas fa-cog text-xl group-hover:rotate-90 transition-transform duration-500"></i>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div className="bg-gray-900 border border-yellow-500/30 rounded-2xl p-6 w-full max-w-md m-4 shadow-2xl relative animate-[popIn_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <h2 className="text-xl font-bold text-yellow-500 mb-6 flex items-center gap-2">
          <i className="fas fa-microphone-alt"></i> 语音设置
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider block">选择语音 (建议选择女声)</label>
            <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-2 pr-2">
              {voices.map(v => (
                 <button
                    key={v.voiceURI}
                    onClick={() => onConfigChange({ browserVoiceURI: v.voiceURI })}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${config.browserVoiceURI === v.voiceURI ? 'border-yellow-500 bg-yellow-500/20 text-yellow-200' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'}`}
                  >
                    <div className="overflow-hidden">
                        <div className="font-medium text-sm truncate">{v.name}</div>
                        <div className="text-xs opacity-60">{v.lang}</div>
                    </div>
                    {config.browserVoiceURI === v.voiceURI && <i className="fas fa-check text-yellow-500 shrink-0 ml-2"></i>}
                  </button>
              ))}
              {voices.length === 0 && (
                  <div className="text-gray-500 text-sm text-center py-4">未检测到中文语音包</div>
              )}
            </div>
          </div>

          <button
            onClick={() => onTest("大家好，我是小信，这是我的新声音。祝大家新年快乐！")}
            className="w-full py-3 bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-500 hover:to-red-500 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 mt-4 shadow-lg active:scale-95"
          >
            <i className="fas fa-volume-up"></i> 试听语音
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettings;
    