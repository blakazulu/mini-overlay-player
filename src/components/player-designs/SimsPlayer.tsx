
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

const SimsPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-gradient-to-br from-[#9be7ff] to-[#4fc3f7] rounded-xl overflow-hidden relative">
      {/* The Sims style UI - clean, light, with Plumbob green accents */}
      <div className="absolute inset-0 bg-white/20 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#3cba54] z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <Input 
            type="text" 
            placeholder="Search tracks..."
            className="w-full bg-white/80 border-[#3cba54] text-xs h-8 text-[#1a237e] placeholder:text-[#455a64]/70 rounded-lg"
          />
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative rounded-lg border-2 border-white">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-xs font-medium bg-white/80 text-[#1a237e] px-2 py-1 flex justify-between">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#1a237e] truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#455a64] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-white/80 p-2 rounded-lg">
              <button className="text-[#455a64] hover:text-[#3cba54] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="flex items-center justify-center text-white bg-[#3cba54] p-2 rounded-full hover:bg-[#2a9d42] transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>
              
              <button className="text-[#455a64] hover:text-[#3cba54] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#455a64] hover:text-[#3cba54] transition-colors">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-[#455a64] hover:text-[#ff5252] transition-colors"
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

export default SimsPlayer;
