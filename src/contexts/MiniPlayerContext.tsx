
import React, { createContext, useContext, useState, useCallback } from 'react';

export type PlayerDesign = 'cyber' | 'neon' | 'hologram';

interface MiniPlayerContextType {
  isVisible: boolean;
  showMiniPlayer: () => void;
  hideMiniPlayer: () => void;
  toggleMiniPlayer: () => void;
  currentDesign: PlayerDesign;
  setDesign: (design: PlayerDesign) => void;
}

const MiniPlayerContext = createContext<MiniPlayerContextType>({
  isVisible: false,
  showMiniPlayer: () => {},
  hideMiniPlayer: () => {},
  toggleMiniPlayer: () => {},
  currentDesign: 'cyber',
  setDesign: () => {},
});

export const useMiniPlayer = () => useContext(MiniPlayerContext);

export const MiniPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDesign, setCurrentDesign] = useState<PlayerDesign>('cyber');

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
    }}>
      {children}
    </MiniPlayerContext.Provider>
  );
};
