
import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, Search, HelpCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
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

const CSPlayer: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-[#1b1e22] border border-[#2d322f] overflow-hidden relative">
      {/* CS-style UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#252a2e] to-[#1b1e22] z-0 opacity-90"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#f7b740] z-10"></div>
      
      {/* Main content layout matching the sketch */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with help and close buttons */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#6d7379]" />
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-[#15191c] border-[#36383a] text-xs h-8 pl-8 text-[#c8d2db] placeholder:text-[#6d7379]"
            />
          </div>
          <button className="text-[#6d7379] hover:text-[#f7b740] transition-colors p-1">
            <HelpCircle size={18} />
          </button>
          <button 
            onClick={onClose}
            className="text-[#6d7379] hover:text-[#f7b740] transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex gap-3 flex-1">
          {/* Album artwork and controls */}
          <div className="flex flex-col gap-2">
            {/* Album artwork - left side */}
            <div className="h-[110px] w-[110px] border border-[#36383a] overflow-hidden flex-shrink-0 relative">
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
                <span className="text-xs text-[#f7b740] font-mono">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-[#6d7379] font-mono">
                  {formatTime(currentSong.duration)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1 mb-2">
              <h3 className="text-lg font-mono text-[#c8d2db] truncate tracking-tight">{currentSong.title}</h3>
              <p className="text-sm text-[#6d7379] font-mono truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mb-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSPlayer;
