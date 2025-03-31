
import React, { useState, useRef, useEffect } from 'react';
import { useMiniPlayer, PlayerDesign } from '@/contexts/MiniPlayerContext';
import CyberPlayer from './player-designs/CyberPlayer';
import NeonPlayer from './player-designs/NeonPlayer';
import HologramPlayer from './player-designs/HologramPlayer';

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
  const { currentDesign } = useMiniPlayer();
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

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
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

  return (
    <div 
      ref={playerRef}
      className="mini-player"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header - Drag Handle */}
      <div className="drag-handle h-5 bg-songhunt-dark cursor-move" />
      
      {/* Render the selected player design */}
      {currentDesign === 'cyber' && (
        <CyberPlayer 
          onClose={onClose} 
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          togglePlayback={togglePlayback} 
        />
      )}
      
      {currentDesign === 'neon' && (
        <NeonPlayer 
          onClose={onClose} 
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          togglePlayback={togglePlayback} 
        />
      )}
      
      {currentDesign === 'hologram' && (
        <HologramPlayer 
          onClose={onClose} 
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          togglePlayback={togglePlayback} 
        />
      )}
    </div>
  );
};

export default MiniPlayer;
