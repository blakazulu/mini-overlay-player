
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

const OverwatchPlayer: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-[#2a2b33] border border-[#f99e1a] overflow-hidden relative">
      {/* Overwatch style UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3b3c49] to-[#2a2b33] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#f99e1a] z-10"></div>
      
      {/* Main content layout */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with close button */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#9999bb]" />
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-[#1f202a] border-[#4a4b53] text-xs h-8 pl-8 text-[#f0f0f0] placeholder:text-[#9999bb] rounded-md"
            />
          </div>
          <button 
            onClick={onClose}
            className="text-[#9999bb] hover:text-[#f99e1a] transition-colors bg-[#1f202a] p-1.5 rounded-md border border-[#4a4b53]"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="flex gap-3 flex-1">
          {/* Album artwork and controls */}
          <div className="flex flex-col gap-2">
            {/* Album artwork - left side */}
            <div className="h-[110px] w-[110px] overflow-hidden flex-shrink-0 relative rounded border border-[#4a4b53]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#40d9ff20] to-transparent z-10"></div>
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
                <span className="text-xs text-[#f99e1a] font-medium">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-[#9999bb]">
                  {formatTime(currentSong.duration)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1 mb-2">
              <h3 className="text-lg text-[#f0f0f0] truncate font-medium">{currentSong.title}</h3>
              <p className="text-sm text-[#9999bb] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mb-2 bg-[#1f202a] p-2 rounded-md border border-[#4a4b53]">
              <button className="text-[#9999bb] hover:text-[#40d9ff] transition-colors">
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-[#f0f0f0] hover:text-white transition-colors bg-[#f99e1a] hover:bg-[#ffb44d] p-1.5 rounded-md"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="text-[#9999bb] hover:text-[#40d9ff] transition-colors">
                <SkipForward size={18} />
              </button>
              
              <button className="text-[#9999bb] hover:text-[#40d9ff] transition-colors">
                <Volume2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverwatchPlayer;
