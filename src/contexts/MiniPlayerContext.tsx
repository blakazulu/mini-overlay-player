
import React, { createContext, useContext, useState, useCallback } from 'react';

type PlayerSize = 'small' | 'medium' | 'large';

interface MiniPlayerContextType {
  isVisible: boolean;
  playerSize: PlayerSize;
  showMiniPlayer: () => void;
  hideMiniPlayer: () => void;
  toggleMiniPlayer: () => void;
  setPlayerSize: (size: PlayerSize) => void;
}

const MiniPlayerContext = createContext<MiniPlayerContextType>({
  isVisible: false,
  playerSize: 'small',
  showMiniPlayer: () => {},
  hideMiniPlayer: () => {},
  toggleMiniPlayer: () => {},
  setPlayerSize: () => {},
});

export const useMiniPlayer = () => useContext(MiniPlayerContext);

export const MiniPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [playerSize, setPlayerSize] = useState<PlayerSize>('small');

  const showMiniPlayer = useCallback(() => setIsVisible(true), []);
  const hideMiniPlayer = useCallback(() => setIsVisible(false), []);
  const toggleMiniPlayer = useCallback(() => setIsVisible(prev => !prev), []);
  
  // Add function to change player size
  const handleSetPlayerSize = useCallback((size: PlayerSize) => {
    setPlayerSize(size);
  }, []);

  return (
    <MiniPlayerContext.Provider value={{
      isVisible,
      playerSize,
      showMiniPlayer,
      hideMiniPlayer,
      toggleMiniPlayer,
      setPlayerSize: handleSetPlayerSize,
    }}>
      {children}
    </MiniPlayerContext.Provider>
  );
};
