
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

const CyberPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-black border-2 border-songhunt-red rounded-md overflow-hidden relative">
      {/* Cyber elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-songhunt-dark z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-songhunt-red"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-songhunt-red"></div>
      <div className="absolute top-0 right-0 h-full w-1 bg-songhunt-red"></div>
      <div className="absolute top-0 left-0 h-full w-1 bg-songhunt-red"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-3 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <Input 
            type="text" 
            placeholder="Search tracks..."
            className="w-full bg-songhunt-dark border-songhunt-red text-xs h-8 text-songhunt-red placeholder:text-songhunt-red/50"
          />
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 border-2 border-songhunt-red overflow-hidden flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-songhunt-red/30 z-10"></div>
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-1 left-1 right-1 text-xs font-mono bg-black/70 text-songhunt-red px-1 py-0.5 flex justify-between">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-lg font-mono text-songhunt-red truncate">{currentSong.title}</h3>
              <p className="text-sm text-songhunt-red/80 font-mono truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-songhunt-dark p-2 border border-songhunt-red">
              <button className="text-songhunt-red hover:text-white transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="text-songhunt-red hover:text-white transition-colors bg-black/50 p-1.5 rounded-full border border-songhunt-red"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="text-songhunt-red hover:text-white transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-songhunt-red hover:text-white transition-colors">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-songhunt-red hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberPlayer;
