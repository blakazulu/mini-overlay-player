
import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMiniPlayer } from '@/contexts/MiniPlayerContext';
import { Input } from './ui/input';

interface Position {
  x: number;
  y: number;
}

interface MiniPlayerProps {
  onClose: () => void;
  currentSong?: {
    title: string;
    artist: string;
    cover: string;
    duration: number;
  };
}

const defaultSong = {
  title: "Iron",
  artist: "Woodkid",
  cover: "/lovable-uploads/aa317b98-2fe5-4cce-8d97-acce21086903.png",
  duration: 225, // 3:45 in seconds
};

const MiniPlayer: React.FC<MiniPlayerProps> = ({ onClose, currentSong = defaultSong }) => {
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  
  const playerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!playerRef.current) return;
    
    // Only start drag if clicking the drag handle area
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      e.preventDefault();
      setIsDragging(true);
      
      const rect = playerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const currentTime = '1:45';

  return (
    <div 
      ref={playerRef}
      className="mini-player glass-morphism rounded-md overflow-hidden"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: '450px',
        height: '160px'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header - Drag Handle */}
      <div className="drag-handle flex justify-between items-center p-2 bg-songhunt-dark">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-songhunt-red"></div>
          <span className="text-xs font-medium">Songhunt Player</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowLabels(!showLabels)} 
            className="text-gray-400 hover:text-white transition-colors"
            title="Toggle Labels"
          >
            <HelpCircle size={16} />
          </button>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="p-3 flex flex-col">
        {/* Search bar - full width */}
        <div className="w-full mb-3">
          <Input 
            type="text" 
            placeholder="Search songs..." 
            className="w-full bg-songhunt-dark border border-gray-800 text-xs h-8"
          />
        </div>
        
        <div className="flex flex-1">
          {/* Album artwork - left side */}
          <div className="h-20 w-20 rounded overflow-hidden flex-shrink-0">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Right side content - song info */}
          <div className="ml-3 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-sm font-semibold truncate">{currentSong.title}</h3>
              <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
            </div>
            
            {/* Timestamp */}
            <div className="text-xs text-gray-500 self-end">
              {currentTime} / {formatTime(currentSong.duration)}
            </div>
          </div>
        </div>
        
        {/* Controls at bottom - spread across */}
        <div className="flex justify-between items-center mt-4">
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Previous Track (Ctrl+Left)"
          >
            <SkipBack size={20} />
            {showLabels && <span className="absolute -top-5 text-xs text-gray-500">Ctrl+Left</span>}
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Play/Pause (Ctrl+Space)"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {showLabels && <span className="absolute -top-5 text-xs text-gray-500">Ctrl+Space</span>}
          </button>
          
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Next Track (Ctrl+Right)"
          >
            <SkipForward size={20} />
            {showLabels && <span className="absolute -top-5 text-xs text-gray-500">Ctrl+Right</span>}
          </button>
          
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Volume (Vol+/-)"
          >
            <Volume2 size={20} />
            {showLabels && <span className="absolute -top-5 text-xs text-gray-500">Vol+/-</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
