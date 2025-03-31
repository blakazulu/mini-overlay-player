
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

const HologramPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-black/80 backdrop-blur-xl rounded-md overflow-hidden relative border border-cyan-500/30">
      {/* Holographic effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-cyan-900/10 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg4LDIyOSwyNTAsMC4wNCkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJzY2FubGluZXMiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjgiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgwKSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMSIgZmlsbD0icmdiYSg4LDIyOSwyNTAsMC4wMikiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc2NhbmxpbmVzKSIvPjwvc3ZnPg==')]"></div>
      
      {/* Horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-4">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search tracks..."
              className="w-full bg-black/50 border-cyan-500/40 text-xs h-8 text-cyan-300 placeholder:text-cyan-300/50 pr-8"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400/70 text-[10px] font-mono">SEARCH</div>
          </div>
        </div>
        
        <div className="flex flex-1 gap-4">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative border border-cyan-500/30 group">
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 z-10 group-hover:opacity-0 transition-opacity"></div>
            <div className="absolute inset-0 z-20">
              <div className="absolute top-0 h-[1px] w-full bg-cyan-400/50 animate-[scanline_4s_linear_infinite]"></div>
            </div>
            
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-[10px] font-mono bg-black/70 text-cyan-400 px-2 py-0.5 flex justify-between">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-cyan-400 mr-1.5"></div>
                <h3 className="text-base font-mono uppercase text-cyan-300 truncate tracking-wider">{currentSong.title}</h3>
              </div>
              <p className="text-xs text-cyan-400/70 truncate pl-3 font-mono">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex-1 flex justify-between items-center px-3 py-2 bg-black/40 border border-cyan-500/20 backdrop-blur-sm rounded-sm">
                <button className="text-cyan-400 hover:text-white transition-colors">
                  <SkipBack size={18} />
                </button>
                
                <button 
                  onClick={togglePlayback} 
                  className="text-white bg-cyan-500/20 hover:bg-cyan-500/30 p-1.5 rounded-sm border border-cyan-500/40 transition-colors relative group"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 translate-y-full text-[8px] text-cyan-400/70 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </span>
                </button>
                
                <button className="text-cyan-400 hover:text-white transition-colors">
                  <SkipForward size={18} />
                </button>
                
                <button className="text-cyan-400 hover:text-white transition-colors">
                  <Volume2 size={18} />
                </button>
                
                <button 
                  onClick={onClose}
                  className="text-cyan-400 hover:text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HologramPlayer;
