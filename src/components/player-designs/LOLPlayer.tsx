
import React from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
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

const LOLPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-[#010a13] overflow-hidden relative">
      {/* League of Legends style UI - gold accents and ornate details */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyNSAwIEwgMCAyNSBNIDUwIDI1IEwgMjUgNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMDEsMTcwLDg4LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] z-0"></div>
      
      {/* Ornate border design */}
      <div className="absolute inset-0 border-2 border-[#c9aa58]/30 z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c9aa58]/20 via-[#c9aa58] to-[#c9aa58]/20 z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c9aa58]/20 via-[#c9aa58] to-[#c9aa58]/20 z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <Input 
            type="text" 
            placeholder="Search tracks..."
            className="w-full bg-[#091428] border border-[#c8aa6e]/30 text-xs h-8 text-[#c8aa6e] placeholder:text-[#c8aa6e]/50 rounded-none focus:border-[#c9aa58] focus:ring-[#c9aa58]"
          />
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative border border-[#c9aa58]/30">
            <div className="absolute inset-[2px] overflow-hidden">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-xs font-bold bg-[#010a13]/80 text-[#c9aa58] px-2 py-1 flex justify-between">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[#f0e6d2] uppercase truncate tracking-wider">{currentSong.title}</h3>
              <p className="text-sm text-[#a09b8c] truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-[#091428] p-2 border border-[#c9aa58]/30">
              <button className="text-[#c8aa6e] hover:text-[#f0e6d2] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="flex items-center justify-center h-8 w-8 border border-[#c9aa58] bg-[#091428] hover:bg-[#091428]/80 text-[#c9aa58]"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button className="text-[#c8aa6e] hover:text-[#f0e6d2] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#c8aa6e] hover:text-[#f0e6d2] transition-colors">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-[#c8aa6e] hover:text-[#ff4655] transition-colors"
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

export default LOLPlayer;
