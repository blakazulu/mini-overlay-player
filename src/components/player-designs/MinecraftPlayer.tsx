
import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, Search, HelpCircle } from 'lucide-react';
import { Input } from '../ui/input';

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
}

const MinecraftPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback, currentTime }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const progressPercentage = (currentTime / currentSong.duration) * 100;

  return (
    <div className="w-[450px] h-[200px] bg-[#8b8b8b] border-4 border-[#373737] rounded-none overflow-hidden relative">
      {/* Minecraft-style UI - pixelated darker border */}
      <div className="absolute inset-0 border-8 border-[#c6c6c6] z-10"></div>
      <div className="absolute inset-[8px] border-2 border-[#555555] z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYhe3TsQ0AIAwEsYt977k50ErW3BAK+358RrYz/jWvq6rv7DG5Ab8BAAAAAAAAAAAAdwEHMABIezJbH1V4hQAAAABJRU5ErkJggg==')] opacity-20 z-0"></div>
      
      {/* Main content layout matching the sketch */}
      <div className="relative z-20 p-4 flex flex-col h-full">
        {/* Search bar with help and close buttons */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Input 
              type="text" 
              placeholder="SEARCH TRACKS"
              className="w-full bg-[#c6c6c6] border-2 border-[#555555] text-xs h-8 text-[#222] placeholder:text-[#555] rounded-none font-['Minecraft', monospace] shadow-[inset_2px_2px_#555]"
            />
          </div>
          <button className="text-[#222] hover:text-[#555] transition-colors bg-[#c6c6c6] border-2 border-b-4 border-r-4 border-[#555] hover:border-b-2 hover:border-r-2 p-1 active:translate-y-[2px] active:translate-x-[2px] active:border-b-2 active:border-r-2">
            <HelpCircle size={18} />
          </button>
          <button 
            onClick={onClose}
            className="text-[#222] hover:text-[#555] transition-colors bg-[#c6c6c6] border-2 border-b-4 border-r-4 border-[#555] hover:border-b-2 hover:border-r-2 p-1 active:translate-y-[2px] active:translate-x-[2px] active:border-b-2 active:border-r-2"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Main player layout */}
        <div className="flex gap-3 flex-1">
          {/* Album artwork - left side */}
          <div className="h-[110px] w-[110px] border-2 border-[#555555] overflow-hidden flex-shrink-0 relative">
            {/* Creating pixelation effect on the image */}
            <div className="absolute inset-0 bg-black opacity-5 z-10"></div>
            <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEElEQVQImWNgYGD4z4AE/gMADQEDDTrSAMIAAAAASUVORK5CYII=')] bg-repeat opacity-20 z-10"></div>
            
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
              <h3 className="text-lg font-['Minecraft', monospace] text-[#222] truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#444] font-['Minecraft', monospace] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center mb-2">
              <button className="text-[#222] hover:text-[#555] transition-colors bg-[#c6c6c6] border-2 border-b-4 border-r-4 border-[#555] hover:border-b-2 hover:border-r-2 p-1 active:translate-y-[2px] active:translate-x-[2px] active:border-b-2 active:border-r-2">
                <SkipBack size={18} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-[#222] hover:text-[#555] transition-colors bg-[#c6c6c6] border-2 border-b-4 border-r-4 border-[#555] hover:border-b-2 hover:border-r-2 p-1 active:translate-y-[2px] active:translate-x-[2px] active:border-b-2 active:border-r-2"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <button className="text-[#222] hover:text-[#555] transition-colors bg-[#c6c6c6] border-2 border-b-4 border-r-4 border-[#555] hover:border-b-2 hover:border-r-2 p-1 active:translate-y-[2px] active:translate-x-[2px] active:border-b-2 active:border-r-2">
                <SkipForward size={18} />
              </button>
              
              <button className="text-[#222] hover:text-[#555] transition-colors bg-[#c6c6c6] border-2 border-b-4 border-r-4 border-[#555] hover:border-b-2 hover:border-r-2 p-1 active:translate-y-[2px] active:translate-x-[2px] active:border-b-2 active:border-r-2">
                <Volume2 size={18} />
              </button>
            </div>
            
            {/* Progress bar (Minecraft style) */}
            <div className="relative h-4 bg-[#555555] w-full border-2 border-[#555555] mb-1">
              <div 
                className="absolute top-0 left-0 h-full bg-[#c6c6c6]" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Time display */}
        <div className="flex justify-end">
          <div className="bg-[#c6c6c6] text-xs text-[#222] font-['Minecraft', monospace] border-2 border-[#555555] px-2 py-0.5">
            {formatTime(currentTime)} / {formatTime(currentSong.duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftPlayer;
