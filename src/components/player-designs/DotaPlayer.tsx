
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

const DotaPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-[#15191e] overflow-hidden relative">
      {/* Dota 2 style UI - dark with red accents */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgMCBNIC0xMCA1MCBMIDU1IC0xMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNDQsMjM4LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] z-0"></div>
      
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#a8301b] z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <Input 
            type="text" 
            placeholder="Search tracks..."
            className="w-full bg-[#21272f] border border-[#444b55] text-xs h-8 text-[#ede8df] placeholder:text-[#7d8594] rounded-none focus:border-[#a8301b] focus:ring-[#a8301b]"
          />
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative border border-[#444b55]">
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-br from-[#a8301b]/10 to-transparent"></div>
            </div>
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-xs font-mono bg-[#0d1016]/90 text-[#ede8df] px-2 py-1 flex justify-between">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#ede8df] uppercase truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#7d8594] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-[#21272f] p-2 border border-[#444b55]">
              <button className="text-[#7d8594] hover:text-[#ede8df] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className={`flex items-center justify-center h-8 w-8 ${isPlaying ? 'bg-[#617379]' : 'bg-[#a8301b]'} text-[#ede8df] hover:opacity-90 transition-opacity`}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button className="text-[#7d8594] hover:text-[#ede8df] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#7d8594] hover:text-[#ede8df] transition-colors">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-[#7d8594] hover:text-[#a8301b] transition-colors"
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

export default DotaPlayer;
