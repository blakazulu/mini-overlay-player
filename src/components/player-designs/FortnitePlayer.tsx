
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

const FortnitePlayer: React.FC<PlayerProps> = ({ 
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
    <div className="w-[450px] h-[200px] bg-gradient-to-br from-[#2a49d8] via-[#222969] to-[#191b4a] rounded-lg overflow-hidden relative">
      {/* Fortnite-style UI - vibrant, colorful with diagonal elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMCAyMCBMIDIwIDAgTSAtNSAyNSBMIDI1IC01IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTI5LCA4MCwgMjU1LCAwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] z-0 opacity-40"></div>
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fc24ff] via-[#4a6aff] to-[#19cdd7] z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#19cdd7] via-[#4a6aff] to-[#fc24ff] z-10"></div>
      
      {/* Main content layout matching the sketch */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar with help and close buttons */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#8f9bff]/70" />
            <Input 
              type="text" 
              placeholder="SEARCH TRACKS"
              className="w-full bg-[#161639] border border-[#7918ef]/50 text-xs h-8 pl-8 text-[#fcfcfc] placeholder:text-[#8f9bff]/70 rounded-md"
            />
          </div>
          <button className="text-[#8f9bff] hover:text-[#19cdd7] transition-all transform hover:scale-110 bg-[#161639]/80 p-1 rounded-md">
            <HelpCircle size={18} />
          </button>
          <button 
            onClick={onClose}
            className="text-[#8f9bff] hover:text-[#fc24ff] transition-all transform hover:scale-110 bg-[#161639]/80 p-1 rounded-md"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Main player layout */}
        <div className="flex gap-4 flex-1">
          {/* Album artwork - left side */}
          <div className="h-[110px] w-[110px] overflow-hidden flex-shrink-0 relative rounded-md border border-[#7918ef]/30">
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#fc24ff] to-[#19cdd7] opacity-50 blur-sm rounded-md"></div>
            <div className="absolute inset-0 rounded-md overflow-hidden z-10">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            {/* Song details */}
            <div className="space-y-1 mb-2">
              <h3 className="text-base font-extrabold uppercase text-white tracking-wide truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#8f9bff] truncate font-medium">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mb-2">
              <button className="text-[#8f9bff] hover:text-[#fc24ff] transition-all transform hover:scale-110">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className={`transition-all transform hover:scale-110 p-2 rounded-full ${isPlaying ? 'bg-[#fc24ff]/80' : 'bg-[#19cdd7]/80'}`}
              >
                {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-0.5" />}
              </button>
              
              <button className="text-[#8f9bff] hover:text-[#19cdd7] transition-all transform hover:scale-110">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#8f9bff] hover:text-[#19cdd7] transition-all transform hover:scale-110">
                <Volume2 size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress bar and timestamps at bottom */}
        <div className="mt-3 space-y-1">
          <Slider
            value={[progressPercentage]}
            max={100}
            step={1}
            onValueChange={handleProgressChange}
            className="h-1.5"
          />
          <div className="flex justify-between">
            <div className="text-xs text-[#19cdd7] font-bold">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-[#fc24ff] font-bold">
              {formatTime(currentSong.duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortnitePlayer;
