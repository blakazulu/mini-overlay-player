
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

const CounterStrike2Player: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-[#171a21] border border-[#365f9d] overflow-hidden relative">
      {/* CS2-style UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e2228] to-[#171a21] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#4972be] z-10"></div>
      
      {/* Main content layout */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with help and close buttons */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#8f98a0]" />
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-[#0f1013] border-[#365f9d] text-xs h-8 pl-8 text-[#c7d5e0] placeholder:text-[#8f98a0]"
            />
          </div>
          <button className="text-[#8f98a0] hover:text-[#4972be] transition-colors p-1">
            <HelpCircle size={18} />
          </button>
          <button 
            onClick={onClose}
            className="text-[#8f98a0] hover:text-[#4972be] transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex gap-3 flex-1">
          {/* Album artwork and controls */}
          <div className="flex flex-col gap-2">
            {/* Album artwork - left side */}
            <div className="h-[110px] w-[110px] border border-[#365f9d] overflow-hidden flex-shrink-0 relative">
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
                <span className="text-xs text-[#4972be] font-mono">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-[#8f98a0] font-mono">
                  {formatTime(currentSong.duration)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1 mb-2">
              <h3 className="text-lg font-mono text-[#c7d5e0] truncate tracking-tight">{currentSong.title}</h3>
              <p className="text-sm text-[#8f98a0] font-mono truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mb-2">
              <button className="text-[#8f98a0] hover:text-[#4972be] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-[#c7d5e0] hover:text-[#4972be] transition-colors bg-[#1e2228] p-1.5 rounded-sm border border-[#365f9d]"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="text-[#8f98a0] hover:text-[#4972be] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#8f98a0] hover:text-[#4972be] transition-colors">
                <Volume2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterStrike2Player;
