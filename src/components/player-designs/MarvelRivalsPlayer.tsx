
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

const MarvelRivalsPlayer: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-[#121212] border-2 border-[#ed1d24] marvel-glow rounded-md overflow-hidden relative">
      {/* Marvel style UI - dark with red accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#121212] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#ed1d24] z-10"></div>
      
      {/* Main content layout */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with close button */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#888888]" />
            <Input 
              type="text" 
              placeholder="Search Marvel tracks..."
              className="w-full bg-[#1a1a1a] border-[#444444] text-xs h-8 pl-8 text-white placeholder:text-[#888888]"
            />
          </div>
          <button 
            onClick={onClose}
            className="text-[#888888] hover:text-[#ed1d24] transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex gap-3 flex-1">
          {/* Album artwork and controls */}
          <div className="flex flex-col gap-2">
            {/* Album artwork - left side */}
            <div className="h-[110px] w-[110px] border-2 border-[#ed1d24] overflow-hidden flex-shrink-0 relative">
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
                <span className="text-xs text-[#ed1d24] font-bold">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-[#888888]">
                  {formatTime(currentSong.duration)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1 mb-2">
              <h3 className="text-lg font-bold text-white tracking-tight uppercase">{currentSong.title}</h3>
              <p className="text-sm text-[#888888]">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center p-2 bg-black/30 rounded border border-[#333333]">
              <button className="text-[#888888] hover:text-[#ed1d24] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-white bg-[#ed1d24] hover:bg-[#ff3333] transition-colors p-2 rounded"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="text-[#888888] hover:text-[#ed1d24] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#888888] hover:text-[#ed1d24] transition-colors">
                <Volume2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarvelRivalsPlayer;
