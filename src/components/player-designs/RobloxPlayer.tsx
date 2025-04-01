
import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, HelpCircle, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';

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
  progressPercentage: number;
  formatTime: (seconds: number) => string;
  handleProgressChange: (value: number[]) => void;
}

const RobloxPlayer: React.FC<PlayerProps> = ({ 
  onClose, 
  currentSong, 
  isPlaying, 
  togglePlayback, 
  currentTime,
  progressPercentage,
  formatTime,
  handleProgressChange 
}) => {
  return (
    <div className="w-[450px] h-[200px] bg-[#f2f2f2] rounded-md overflow-hidden relative">
      {/* Roblox style UI - gray with red accents */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#f25f5c] z-10"></div>
      
      {/* Main content layout matching the sketch */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with help and close buttons */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#6b6b6b]" />
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-white border border-[#cccccc] text-xs h-8 pl-8 text-[#393b3d] placeholder:text-[#6b6b6b] rounded"
            />
          </div>
          <button className="text-[#393b3d] hover:text-[#00a2ff] transition-colors bg-white p-1 rounded border border-[#cccccc]">
            <HelpCircle size={18} />
          </button>
          <button 
            onClick={onClose}
            className="text-[#393b3d] hover:text-[#f25f5c] transition-colors bg-white p-1 rounded border border-[#cccccc]"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Main player layout */}
        <div className="flex gap-3 flex-1">
          {/* Album artwork - left side */}
          <div className="h-[110px] w-[110px] overflow-hidden flex-shrink-0 relative rounded border-2 border-[#cccccc]">
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
              <h3 className="text-base font-bold text-[#393b3d] truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#6b6b6b] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mb-2 bg-white p-2 rounded border border-[#cccccc]">
              <button className="text-[#393b3d] hover:text-[#f25f5c] transition-colors">
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className={`flex items-center justify-center rounded text-white px-3 py-1 font-bold ${isPlaying ? 'bg-[#00a2ff]' : 'bg-[#f25f5c]'}`}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
              
              <button className="text-[#393b3d] hover:text-[#f25f5c] transition-colors">
                <SkipForward size={18} />
              </button>
              
              <button className="text-[#393b3d] hover:text-[#00a2ff] transition-colors">
                <Volume2 size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress bar and timestamps at bottom */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2">
            <Slider
              value={[progressPercentage]}
              max={100}
              step={1}
              onValueChange={handleProgressChange}
              className="h-1.5 flex-grow"
            />
            <div className="text-xs font-bold text-[#393b3d] bg-white px-2 py-1 rounded border border-[#cccccc]">
              {formatTime(currentTime)}/{formatTime(currentSong.duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobloxPlayer;
