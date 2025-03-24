
import React, { createContext, useContext, useState, useCallback } from 'react';

interface MiniPlayerContextType {
  isVisible: boolean;
  showMiniPlayer: () => void;
  hideMiniPlayer: () => void;
  toggleMiniPlayer: () => void;
}

const MiniPlayerContext = createContext<MiniPlayerContextType>({
  isVisible: false,
  showMiniPlayer: () => {},
  hideMiniPlayer: () => {},
  toggleMiniPlayer: () => {},
});

export const useMiniPlayer = () => useContext(MiniPlayerContext);

export const MiniPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showMiniPlayer = useCallback(() => setIsVisible(true), []);
  const hideMiniPlayer = useCallback(() => setIsVisible(false), []);
  const toggleMiniPlayer = useCallback(() => setIsVisible(prev => !prev), []);

  return (
    <MiniPlayerContext.Provider value={{
      isVisible,
      showMiniPlayer,
      hideMiniPlayer,
      toggleMiniPlayer,
    }}>
      {children}
    </MiniPlayerContext.Provider>
  );
};
