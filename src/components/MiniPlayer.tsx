
import React, { useState, useRef, useEffect } from 'react';
import { useMiniPlayer, PlayerDesign } from '@/contexts/MiniPlayerContext';
import CSPlayer from './player-designs/CSPlayer';
import MinecraftPlayer from './player-designs/MinecraftPlayer';
import FortnitePlayer from './player-designs/FortnitePlayer';
import SimsPlayer from './player-designs/SimsPlayer';
import RobloxPlayer from './player-designs/RobloxPlayer';
import MarvelPlayer from './player-designs/MarvelPlayer';
import LOLPlayer from './player-designs/LOLPlayer';
import DotaPlayer from './player-designs/DotaPlayer';
import ValorantPlayer from './player-designs/ValorantPlayer';
import PUBGPlayer from './player-designs/PUBGPlayer';

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
  const [currentTime, setCurrentTime] = useState(105); // 1:45 in seconds
  
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

  // Render the appropriate player component based on the selected design
  const renderPlayerDesign = () => {
    const playerProps = {
      onClose,
      currentSong,
      isPlaying,
      togglePlayback,
      currentTime
    };

    switch (currentDesign) {
      case 'cs':
        return <CSPlayer {...playerProps} />;
      case 'minecraft':
        return <MinecraftPlayer {...playerProps} />;
      case 'fortnite':
        return <FortnitePlayer {...playerProps} />;
      case 'sims':
        return <SimsPlayer {...playerProps} />;
      case 'roblox':
        return <RobloxPlayer {...playerProps} />;
      case 'marvel':
        return <MarvelPlayer {...playerProps} />;
      case 'lol':
        return <LOLPlayer {...playerProps} />;
      case 'dota':
        return <DotaPlayer {...playerProps} />;
      case 'valorant':
        return <ValorantPlayer {...playerProps} />;
      case 'pubg':
        return <PUBGPlayer {...playerProps} />;
      default:
        return <CSPlayer {...playerProps} />;
    }
  };

  return (
    <div 
      ref={playerRef}
      className="mini-player fixed"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: '450px',
        zIndex: 9999
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header - Drag Handle */}
      <div className="drag-handle h-5 bg-songhunt-dark cursor-move" />
      
      {/* Render the selected player design */}
      {renderPlayerDesign()}
    </div>
  );
};

export default MiniPlayer;
