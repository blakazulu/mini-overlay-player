
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

const ValorantPlayer: React.FC<PlayerProps> = ({ onClose, currentSong, isPlaying, togglePlayback }) => {
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div className="w-[450px] h-[200px] bg-[#0f1923] overflow-hidden relative">
      {/* Valorant style UI - minimalistic with accent on clean lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSw3MCw4NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] z-0"></div>
      
      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff4655] z-10"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <Input 
            type="text" 
            placeholder="SEARCH TRACKS..."
            className="w-full bg-[#1f2731] border-0 text-xs h-8 text-[#ece8e1] placeholder:text-[#ece8e1]/40 rounded-none tracking-widest uppercase font-medium"
          />
        </div>
        
        <div className="flex flex-1 gap-3">
          {/* Album artwork - left side */}
          <div className="h-28 w-28 overflow-hidden flex-shrink-0 relative">
            <div className="absolute inset-0 bg-[#ff4655]/5 z-0"></div>
            <div className="absolute inset-0 overflow-hidden z-10">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Timestamp overlay */}
            <div className="absolute bottom-0 left-0 right-0 text-xs font-mono font-bold bg-[#0f1923]/90 text-[#ece8e1] px-2 py-1 flex justify-between z-20">
              <span>{currentTime}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-base font-bold tracking-wider text-[#ece8e1] uppercase truncate">{currentSong.title}</h3>
              <p className="text-sm text-[#ece8e1]/70 truncate">{currentSong.artist}</p>
            </div>
            
            {/* Controls at bottom */}
            <div className="flex justify-between items-center mt-2 bg-[#1f2731] p-2">
              <button className="text-[#ece8e1]/70 hover:text-[#ece8e1] transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlayback} 
                className="flex items-center justify-center h-8 w-8 bg-[#ff4655] text-[#0f1923] hover:bg-[#ff4655]/90 transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              
              <button className="text-[#ece8e1]/70 hover:text-[#ece8e1] transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button className="text-[#ece8e1]/70 hover:text-[#ece8e1] transition-colors">
                <Volume2 size={20} />
              </button>
              
              <button 
                onClick={onClose}
                className="text-[#ece8e1]/70 hover:text-[#ff4655] transition-colors"
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

export default ValorantPlayer;
