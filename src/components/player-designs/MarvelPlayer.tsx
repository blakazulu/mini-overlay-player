
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

const MarvelPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-gradient-to-br from-[#202020] to-[#0d0d0d] rounded-md overflow-hidden relative">
      {/* Marvel style UI - red accents with stark technology feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] z-0 opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ed1d24] via-[#f78f3f] to-[#ed1d24] z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-[#1a1a1a] border border-[#ed1d24]/30 text-xs h-8 text-[#e6e6e6] placeholder:text-[#868686] rounded focus:ring-[#ed1d24] focus:border-[#ed1d24]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ed1d24] text-xs font-bold">SEARCH</div>
          </div>
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#ed1d24] to-[#f78f3f] opacity-70 z-0"></div>
            <div className="absolute inset-0 bg-[#0d0d0d] z-10"></div>
            <div className="absolute inset-[2px] z-20 overflow-hidden">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-xs font-mono bg-black/80 text-[#ed1d24] px-2 py-1 flex justify-between z-30">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase tracking-wide truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#b0b0b0] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-[#1a1a1a] p-2 rounded border border-[#ed1d24]/20">
              <button className="text-[#b0b0b0] hover:text-[#f78f3f] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="flex items-center justify-center h-9 w-9 rounded-full bg-[#ed1d24] text-white hover:bg-[#f78f3f] transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button className="text-[#b0b0b0] hover:text-[#f78f3f] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#b0b0b0] hover:text-[#f78f3f] transition-colors">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-white hover:text-[#ed1d24] transition-colors"
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

export default MarvelPlayer;
