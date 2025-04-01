
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

const RocketLeaguePlayer: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-[#0d2036] border border-[#30d6fb] overflow-hidden relative">
      {/* Rocket League style UI - blue with neon accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2036] to-[#071422] z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#30d6fb] z-10"></div>
      
      {/* Main content layout */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with help and close buttons */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#537196]" />
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-[#071422] border-[#30d6fb50] text-xs h-8 pl-8 text-[#e0e1e5] placeholder:text-[#537196]"
            />
          </div>
          <button className="text-[#537196] hover:text-[#30d6fb] transition-colors bg-[#071422] p-1 border border-[#30d6fb50]">
            <HelpCircle size={18} />
          </button>
          <button 
            onClick={onClose}
            className="text-[#537196] hover:text-[#30d6fb] transition-colors bg-[#071422] p-1 border border-[#30d6fb50]"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex gap-3 flex-1">
          {/* Album artwork - left side */}
          <div className="h-[110px] w-[110px] border border-[#30d6fb50] overflow-hidden flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#30d6fb20] to-transparent z-10"></div>
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
              <h3 className="text-lg font-medium text-[#e0e1e5] truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#537196] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center p-2 bg-[#071422] rounded border border-[#30d6fb50]">
              <button className="text-[#537196] hover:text-[#30d6fb] transition-colors">
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-[#0d2036] bg-[#30d6fb] hover:bg-[#5ee3ff] transition-colors p-1.5 rounded-full"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>
              
              <button className="text-[#537196] hover:text-[#30d6fb] transition-colors">
                <SkipForward size={18} />
              </button>
              
              <button className="text-[#537196] hover:text-[#30d6fb] transition-colors">
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
            <div className="text-xs bg-[#071422] text-[#30d6fb] px-2 py-1 border border-[#30d6fb50]">
              {formatTime(currentTime)}/{formatTime(currentSong.duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketLeaguePlayer;
