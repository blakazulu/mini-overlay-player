
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

const CSPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-[#1b1e22] border border-[#2d322f] rounded-sm overflow-hidden relative">
      {/* CS-style UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#252a2e] to-[#1b1e22] z-0 opacity-90"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#f7b740] z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-3 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <Input 
            type="text" 
            placeholder="Search tracks..."
            className="w-full bg-[#15191c] border-[#36383a] text-xs h-8 text-[#c8d2db] placeholder:text-[#6d7379]"
          />
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 border border-[#36383a] overflow-hidden flex-shrink-0 relative">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-xs font-mono bg-[#000000cc] text-[#f7b740] px-2 py-0.5 flex justify-between">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-lg font-mono text-[#c8d2db] truncate tracking-tight">{currentSong.title}</h3>
              <p className="text-sm text-[#6d7379] font-mono truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-[#15191c] p-2 border border-[#36383a] rounded-sm">
              <button className="text-[#6d7379] hover:text-[#f7b740] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-[#c8d2db] hover:text-[#f7b740] transition-colors bg-[#252a2e] p-1.5 rounded-sm border border-[#36383a]"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="text-[#6d7379] hover:text-[#f7b740] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#6d7379] hover:text-[#f7b740] transition-colors">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-[#6d7379] hover:text-[#f7b740] transition-colors"
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

export default CSPlayer;
