
import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, HelpCircle, Search } from 'lucide-react';
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
  currentTime: number;
}

const SimsPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback, currentTime }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const progressPercentage = (currentTime / currentSong.duration) * 100;

  return (
    <div className="w-[450px] h-[200px] bg-gradient-to-br from-[#9be7ff] to-[#4fc3f7] rounded-xl overflow-hidden relative">
      {/* The Sims style UI - clean, light, with Plumbob green accents */}
      <div className="absolute inset-0 bg-white/20 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#3cba54] z-10"></div>
      
      {/* Main content layout matching the sketch */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with help and close buttons */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#455a64]/70" />
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-white/80 border-[#3cba54] text-xs h-8 pl-8 text-[#1a237e] placeholder:text-[#455a64]/70 rounded-lg"
            />
          </div>
          <button className="text-[#455a64] hover:text-[#3cba54] transition-colors bg-white/80 p-1 rounded-lg">
            <HelpCircle size={18} />
          </button>
          <button 
            onClick={onClose}
            className="text-[#455a64] hover:text-[#ff5252] transition-colors bg-white/80 p-1 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Main player layout */}
        <div className="flex gap-3 flex-1">
          {/* Album artwork - left side */}
          <div className="h-[110px] w-[110px] overflow-hidden flex-shrink-0 relative rounded-lg border-2 border-white">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1 mb-2">
              <h3 className="text-base font-bold text-[#1a237e] truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#455a64] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mb-2">
              <button className="text-[#455a64] hover:text-[#3cba54] transition-colors">
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="flex items-center justify-center text-white bg-[#3cba54] p-2 rounded-full hover:bg-[#2a9d42] transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button className="text-[#455a64] hover:text-[#3cba54] transition-colors">
                <SkipForward size={18} />
              </button>
              
              <button className="text-[#455a64] hover:text-[#3cba54] transition-colors">
                <Volume2 size={18} />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="relative h-2 bg-white/50 rounded-full overflow-hidden mb-1">
              <div 
                className="absolute top-0 left-0 h-full bg-[#3cba54]" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Time display */}
        <div className="flex justify-end">
          <div className="bg-white/80 text-xs text-[#1a237e] font-medium px-2 py-0.5 rounded-lg">
            {formatTime(currentTime)} / {formatTime(currentSong.duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimsPlayer;
