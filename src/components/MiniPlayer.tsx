
import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [progress, setProgress] = useState(0); // 0-100
  
  const playerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Set up progress simulation when playing
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 225); // Adjust this for speed (225ms for a ~225 second song)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Calculate current time based on progress
  const currentTime = (progress / 100) * currentSong.duration;

  return (
    <div 
      ref={playerRef}
      className="mini-player glass-morphism rounded-md overflow-hidden"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header - Drag Handle */}
      <div className="drag-handle flex justify-between items-center p-2 bg-songhunt-dark">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-songhunt-red"></div>
          <span className="text-xs font-medium">Songhunt Mini Player</span>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-800 progress-bar-height">
        <div 
          className="bg-songhunt-red progress-bar-height transition-all duration-300 ease-linear" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Song info */}
      <div className="flex p-3">
        <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
          <img 
            src={currentSong.cover} 
            alt={currentSong.title} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-3 flex flex-col justify-center overflow-hidden">
          <h3 className="text-sm font-semibold truncate">{currentSong.title}</h3>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
          <div className="text-xs text-gray-500 mt-1">
            {formatTime(currentTime)} / {formatTime(currentSong.duration)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center px-4 pb-3 pt-1">
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={18} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className={cn(
              "rounded-full p-1", 
              "bg-songhunt-red hover:bg-red-600 transition-colors"
            )}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={18} />
          </button>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Volume2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;
