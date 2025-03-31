
import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Input } from '../ui/input';

interface PlayerProps {
  onClose: () => void;
  currentSong: {
    title: string;
    artist: string;
    cover: string;
    duration: number;
  };
  isPlaying: boolean;
  togglePlayback: () => void;
}

const FortnitePlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-gradient-to-br from-[#2a49d8] via-[#222969] to-[#191b4a] rounded-lg overflow-hidden relative">
      {/* Fortnite-style UI - vibrant, colorful with diagonal elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMCAyMCBMIDIwIDAgTSAtNSAyNSBMIDI1IC01IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTI5LCA4MCwgMjU1LCAwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] z-0 opacity-40"></div>
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fc24ff] via-[#4a6aff] to-[#19cdd7] z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#19cdd7] via-[#4a6aff] to-[#fc24ff] z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-[#161639] border border-[#7918ef]/50 text-xs h-8 text-[#fcfcfc] placeholder:text-[#8f9bff]/70 rounded-md focus:ring-[#fc24ff]/50 focus:border-[#fc24ff]/50"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#fc24ff] text-xs">SEARCH</div>
          </div>
        </div>
        
        <div className="flex flex-1 gap-4">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative rounded-md border border-[#7918ef]/30">
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#fc24ff] to-[#19cdd7] opacity-50 blur-sm rounded-md"></div>
            <div className="absolute inset-0 rounded-md overflow-hidden z-10">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-[10px] font-bold bg-[#161639]/90 text-[#19cdd7] px-2 py-1 flex justify-between z-20 rounded-b-md">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold uppercase text-white tracking-wide truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#8f9bff] truncate font-medium">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-[#161639]/80 p-2 rounded-md border border-[#7918ef]/20">
              <button className="text-[#8f9bff] hover:text-[#fc24ff] transition-all transform hover:scale-110">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className={`transition-all transform hover:scale-110 p-2 rounded-full ${isPlaying ? 'bg-[#fc24ff]/80' : 'bg-[#19cdd7]/80'}`}
              >
                {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-0.5" />}
              </button>
              
              <button className="text-[#8f9bff] hover:text-[#19cdd7] transition-all transform hover:scale-110">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#8f9bff] hover:text-[#19cdd7] transition-all transform hover:scale-110">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-[#8f9bff] hover:text-[#fc24ff] transition-all transform hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortnitePlayer;
