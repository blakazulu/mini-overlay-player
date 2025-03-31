
import React, { useState } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
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
}

const NeonPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';
  
  return (
    <div className="w-[450px] h-[200px] bg-songhunt-darkest rounded-lg overflow-hidden relative shadow-[0_0_20px_rgba(239,68,68,0.5)]">
      {/* Neon effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/10 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
      
      {/* Neon border effect */}
      <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_2px_#8B5CF6] z-0"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-3 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <Input 
            type="text" 
            placeholder="Search tracks..."
            className="w-full bg-songhunt-darkest border border-purple-500/30 text-xs h-8 text-purple-300 focus:border-purple-400 focus:ring-purple-400 placeholder:text-purple-300/50"
          />
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side with neon glow */}
          <div className="h-28 w-28 rounded-md overflow-hidden flex-shrink-0 relative shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-500/20 z-10"></div>
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-1 left-1 right-1 text-xs font-mono bg-black/70 text-blue-300 px-1.5 py-0.5 rounded-full flex justify-between text-[10px]">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 truncate">{currentSong.title}</h3>
              <p className="text-sm text-blue-300/80 truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-songhunt-darker/70 p-2.5 rounded-lg border border-purple-500/20">
              <button className="text-blue-400 hover:text-white hover:shadow-[0_0_10px_rgba(96,165,250,0.7)] transition-all">
                <SkipBack size={18} className="stroke-[1.5]" />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-white bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button className="text-blue-400 hover:text-white hover:shadow-[0_0_10px_rgba(96,165,250,0.7)] transition-all">
                <SkipForward size={18} className="stroke-[1.5]" />
              </button>
              
              <button className="text-blue-400 hover:text-white hover:shadow-[0_0_10px_rgba(96,165,250,0.7)] transition-all">
                <Volume2 size={18} className="stroke-[1.5]" />
              </button>
              
              <button 
                onClick={onClose}
                className="text-purple-400 hover:text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.7)] transition-all"
              >
                <X size={18} className="stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonPlayer;
