
import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, Search } from 'lucide-react';
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

const Rainbow6Player: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-[#1a1a1a] border border-[#0896d8] overflow-hidden relative">
      {/* Rainbow Six style UI - dark with blue accents and tech aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#101010] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0896d8] z-10"></div>
      
      {/* Main content layout */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with close button */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#777777]" />
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-[#101010] border-[#333333] text-xs h-8 pl-8 text-[#f5f5f5] placeholder:text-[#777777]"
            />
          </div>
          <button 
            onClick={onClose}
            className="text-[#777777] hover:text-[#0896d8] transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex gap-3 flex-1">
          {/* Album artwork and controls */}
          <div className="flex flex-col gap-2">
            {/* Album artwork - left side with tactical frame */}
            <div className="h-[110px] w-[110px] border border-[#333333] overflow-hidden flex-shrink-0 relative">
              <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-[#0896d8] z-20"></div>
              <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-[#0896d8] z-20"></div>
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#0896d8] z-20"></div>
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#0896d8] z-20"></div>
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Progress bar and timestamps below cover art */}
            <div className="w-[110px]">
              <Slider
                value={[progressPercentage]}
                max={100}
                step={1}
                onValueChange={handleProgressChange}
                className="h-1.5 mb-1"
              />
              <div className="flex justify-between">
                <span className="text-xs text-[#0896d8] font-mono">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-[#777777] font-mono">
                  {formatTime(currentSong.duration)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1 mb-2">
              <h3 className="text-lg font-mono text-[#f5f5f5] truncate tracking-wide uppercase">{currentSong.title}</h3>
              <p className="text-sm font-mono text-[#777777] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center p-2 bg-[#101010] border border-[#333333]">
              <button className="text-[#777777] hover:text-[#0896d8] transition-colors">
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-[#f5f5f5] hover:text-white transition-colors bg-[#0896d8] hover:bg-[#07a7f2] p-1.5"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="text-[#777777] hover:text-[#0896d8] transition-colors">
                <SkipForward size={18} />
              </button>
              
              <button className="text-[#777777] hover:text-[#0896d8] transition-colors">
                <Volume2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rainbow6Player;
