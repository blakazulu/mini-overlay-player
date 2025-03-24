
import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMiniPlayer } from '@/contexts/MiniPlayerContext';
import { Toggle } from './ui/toggle';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

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
  const { playerSize, setPlayerSize } = useMiniPlayer();
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
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

  // Size-specific style
  const getPlayerWidth = () => {
    switch (playerSize) {
      case 'small': return '300px';
      case 'medium': return '350px';
      case 'large': return '450px';
      default: return '300px';
    }
  };

  // Determine what controls to show based on size
  const renderControls = () => {
    if (playerSize === 'small') {
      return (
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Play/Pause (Ctrl+Space)"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Next Track (Ctrl+Right)"
          >
            <SkipForward size={18} />
          </button>
          <div className="text-xs text-gray-500 hidden md:block">Ctrl+Space</div>
          <div className="text-xs text-gray-500 hidden md:block">Ctrl+Right</div>
        </div>
      );
    } else if (playerSize === 'medium') {
      return (
        <div className="flex items-center space-x-3">
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Previous Track (Ctrl+Left)"
          >
            <SkipBack size={18} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Play/Pause (Ctrl+Space)"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Next Track (Ctrl+Right)"
          >
            <SkipForward size={18} />
          </button>
          <div className="flex flex-col text-xs text-gray-500 hidden md:block">
            <div className="flex space-x-3">
              <span>Ctrl+Left</span>
              <span>Ctrl+Space</span>
              <span>Ctrl+Right</span>
            </div>
          </div>
        </div>
      );
    } else { // large
      return (
        <div className="flex items-center space-x-3">
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Previous Track (Ctrl+Left)"
          >
            <SkipBack size={18} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Play/Pause (Ctrl+Space)"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Next Track (Ctrl+Right)"
          >
            <SkipForward size={18} />
          </button>
          <button 
            className="text-white hover:text-songhunt-red transition-colors"
            title="Volume (Vol+/-)"
          >
            <Volume2 size={18} />
          </button>
          <div className="flex flex-col text-xs text-gray-500 hidden md:block">
            <div className="flex space-x-2">
              <span>Ctrl+Left</span>
              <span>Ctrl+Space</span>
              <span>Ctrl+Right</span>
              <span>Vol+/-</span>
            </div>
          </div>
        </div>
      );
    }
  };

  // Render content based on size
  const renderContent = () => {
    if (playerSize === 'small') {
      return (
        <div className="flex p-3">
          <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-3 flex flex-col justify-center overflow-hidden w-full">
            <h3 className="text-sm font-semibold truncate">{currentSong.title}</h3>
            <div className="flex justify-between items-center mt-2">
              {renderControls()}
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      );
    } else if (playerSize === 'medium') {
      return (
        <div className="flex p-3">
          <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-3 flex flex-col justify-center overflow-hidden w-full">
            <h3 className="text-sm font-semibold truncate">{currentSong.title}</h3>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
            <div className="flex justify-between items-center mt-2">
              {renderControls()}
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      );
    } else { // large
      return (
        <div className="flex p-3">
          <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-3 flex flex-col justify-center overflow-hidden w-full">
            <h3 className="text-sm font-semibold truncate">{currentSong.title}</h3>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
            <div className="w-full mt-2 mb-2">
              <input 
                type="text" 
                placeholder="Search songs..." 
                className="w-full bg-songhunt-dark border border-gray-800 rounded px-2 py-1 text-xs"
              />
            </div>
            <div className="flex justify-between items-center">
              {renderControls()}
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div 
      ref={playerRef}
      className="mini-player glass-morphism rounded-md overflow-hidden"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: getPlayerWidth(),
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
        <div className="flex items-center space-x-1">
          <ToggleGroup type="single" value={playerSize} onValueChange={(value) => value && setPlayerSize(value as 'small' | 'medium' | 'large')}>
            <ToggleGroupItem value="small" size="sm" title="Small Player">S</ToggleGroupItem>
            <ToggleGroupItem value="medium" size="sm" title="Medium Player">M</ToggleGroupItem>
            <ToggleGroupItem value="large" size="sm" title="Large Player">L</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Main content area */}
      {renderContent()}
    </div>
  );
};

export default MiniPlayer;
