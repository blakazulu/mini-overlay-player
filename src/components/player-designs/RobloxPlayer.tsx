
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

const RobloxPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-[#f2f2f2] rounded-md overflow-hidden relative">
      {/* Roblox style UI - gray with red accents */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#f25f5c] z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-white border border-[#cccccc] text-xs h-8 text-[#393b3d] placeholder:text-[#6b6b6b] rounded"
            />
          </div>
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative rounded border-2 border-[#cccccc]">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-xs font-bold bg-white/90 text-[#393b3d] px-2 py-1 flex justify-between">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#393b3d] truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#6b6b6b] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-white p-2 rounded border border-[#cccccc]">
              <button className="text-[#393b3d] hover:text-[#f25f5c] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className={`flex items-center justify-center rounded text-white px-4 py-1.5 font-bold ${isPlaying ? 'bg-[#00a2ff]' : 'bg-[#f25f5c]'}`}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button className="text-[#393b3d] hover:text-[#f25f5c] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#393b3d] hover:text-[#00a2ff] transition-colors">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-[#393b3d] hover:text-[#f25f5c] transition-colors"
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

export default RobloxPlayer;
