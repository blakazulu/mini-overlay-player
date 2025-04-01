
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

const WarzonePlayer: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-[#1d1e20] border border-[#45a29a] overflow-hidden relative">
      {/* Warzone style UI - military aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1d1e20] to-[#15181c] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#45a29a] z-10"></div>
      
      {/* Military grid overlay */}
      <div className="absolute inset-0 z-5 opacity-10" 
        style={{
          backgroundSize: '20px 20px',
          backgroundImage: 'linear-gradient(to right, #45a29a 1px, transparent 1px), linear-gradient(to bottom, #45a29a 1px, transparent 1px)'
        }}>
      </div>
      
      {/* Main content layout */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with close button */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#707070]" />
            <Input 
              type="text" 
              placeholder="SEARCH AUDIO FILES..."
              className="w-full bg-[#15181c] border-[#333333] text-xs h-8 pl-8 text-[#c5c6c7] placeholder:text-[#707070] font-mono uppercase"
            />
          </div>
          <button 
            onClick={onClose}
            className="text-[#707070] hover:text-[#45a29a] transition-colors p-1 border border-[#333333] bg-[#15181c]"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex gap-3 flex-1">
          {/* Album artwork and controls */}
          <div className="flex flex-col gap-2">
            {/* Album artwork - left side */}
            <div className="h-[110px] w-[110px] border border-[#333333] overflow-hidden flex-shrink-0 relative">
              {/* Military-style overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#45a29a10] to-transparent z-10"></div>
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
              
              {/* Tactical display corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#45a29a]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#45a29a]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#45a29a]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#45a29a]"></div>
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
              <div className="flex justify-between font-mono">
                <span className="text-xs text-[#45a29a]">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-[#707070]">
                  {formatTime(currentSong.duration)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1 mb-2">
              <h3 className="text-lg font-mono text-[#c5c6c7] truncate uppercase">{currentSong.title}</h3>
              <p className="text-sm font-mono text-[#707070] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center p-2 bg-[#15181c] border border-[#333333]">
              <button className="text-[#707070] hover:text-[#45a29a] transition-colors">
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-white bg-[#45a29a] hover:bg-[#66bfb7] transition-colors p-1.5"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="text-[#707070] hover:text-[#45a29a] transition-colors">
                <SkipForward size={18} />
              </button>
              
              <button className="text-[#707070] hover:text-[#45a29a] transition-colors">
                <Volume2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarzonePlayer;
