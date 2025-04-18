
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

const PUBGPlayer: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-[#2b2b2b] overflow-hidden relative">
      {/* PUBG style UI - military style with angular elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAwIDIwIEwgNDAgMjAgTSAwIDMwIEwgNDAgMzAgTSAxMCAwIEwgMTAgNDAgTSAyMCAwIEwgMjAgNDAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNDEsMTc1LDUyLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] z-0"></div>
      
      {/* Yellow accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#f1af34] z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f1af34] z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with info and close buttons */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#7a7a7a]" />
            <Input 
              type="text" 
              placeholder="SEARCH TRACKS"
              className="w-full bg-[#222222] border border-[#3c3c3c] text-xs h-8 pl-8 text-[#d5d5d5] placeholder:text-[#7a7a7a] rounded-none"
            />
          </div>
          <button className="text-[#7a7a7a] hover:text-[#f1af34] transition-colors bg-[#222222] border border-[#3c3c3c] p-1 rounded-none h-8 w-8 flex items-center justify-center">
            <HelpCircle size={16} />
          </button>
          <button 
            onClick={onClose}
            className="text-[#7a7a7a] hover:text-[#f1af34] transition-colors bg-[#222222] border border-[#3c3c3c] p-1 rounded-none h-8 w-8 flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative border-2 border-[#3c3c3c]">
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000]/40"></div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#d5d5d5] uppercase truncate font-mono">{currentSong.title}</h3>
              <p className="text-sm text-[#7a7a7a] truncate font-mono">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-[#222222] p-2 border border-[#3c3c3c]">
              <button className="text-[#7a7a7a] hover:text-[#f1af34] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="flex items-center justify-center h-8 w-8 bg-[#f1af34] text-[#222222] hover:bg-[#f1af34]/90 transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button className="text-[#7a7a7a] hover:text-[#f1af34] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#7a7a7a] hover:text-[#f1af34] transition-colors">
                <Volume2 size={20} />
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
            <div className="text-xs font-mono bg-[#222222] text-[#f1af34] px-2 py-1 border border-[#3c3c3c]">
              {formatTime(currentTime)} / {formatTime(currentSong.duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PUBGPlayer;
