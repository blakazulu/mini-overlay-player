
import React, { createContext, useContext, useState, useCallback } from 'react';

export type PlayerDesign = 
  | 'counterstrike2' 
  | 'csgo' 
  | 'minecraft' 
  | 'fortnite' 
  | 'sims4' 
  | 'roblox' 
  | 'marvelrivals' 
  | 'lol' 
  | 'dota' 
  | 'valorant' 
  | 'pubg' 
  | 'overwatch' 
  | 'rainbow6' 
  | 'warzone' 
  | 'rocketleague';

interface MiniPlayerContextType {
  isVisible: boolean;
  showMiniPlayer: () => void;
  hideMiniPlayer: () => void;
  toggleMiniPlayer: () => void;
  currentDesign: PlayerDesign;
  setDesign: (design: PlayerDesign) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

const MiniPlayerContext = createContext<MiniPlayerContextType>({
  isVisible: false,
  showMiniPlayer: () => {},
  hideMiniPlayer: () => {},
  toggleMiniPlayer: () => {},
  currentDesign: 'csgo',
  setDesign: () => {},
  currentTime: 0,
  setCurrentTime: () => {},
});

export const useMiniPlayer = () => useContext(MiniPlayerContext);

export const MiniPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDesign, setCurrentDesign] = useState<PlayerDesign>('csgo');
  const [currentTime, setCurrentTime] = useState(105); // Default to 1:45

  const showMiniPlayer = useCallback(() => setIsVisible(true), []);
  const hideMiniPlayer = useCallback(() => setIsVisible(false), []);
  const toggleMiniPlayer = useCallback(() => setIsVisible(prev => !prev), []);
  const setDesign = useCallback((design: PlayerDesign) => setCurrentDesign(design), []);

  return (
    <MiniPlayerContext.Provider value={{
      isVisible,
      showMiniPlayer,
      hideMiniPlayer,
      toggleMiniPlayer,
      currentDesign,
      setDesign,
      currentTime,
      setCurrentTime,
    }}>
      {children}
    </MiniPlayerContext.Provider>
  );
};
