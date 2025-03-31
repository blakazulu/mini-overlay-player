
import React from 'react';
import MiniPlayer from './MiniPlayer';
import { useMiniPlayer } from '@/contexts/MiniPlayerContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

const MiniPlayerWrapper: React.FC = () => {
  const { isVisible, hideMiniPlayer, currentDesign, setDesign } = useMiniPlayer();

  const themes = [
    { id: 'cs', name: 'Counter-Strike' },
    { id: 'minecraft', name: 'Minecraft' },
    { id: 'fortnite', name: 'Fortnite' },
    { id: 'sims', name: 'The Sims 4' },
    { id: 'roblox', name: 'ROBLOX' },
    { id: 'marvel', name: 'Marvel Rivals' },
    { id: 'lol', name: 'League of Legends' },
    { id: 'dota', name: 'Dota 2' },
    { id: 'valorant', name: 'Valorant' },
    { id: 'pubg', name: 'PUBG' }
  ];

  return (
    <>
      {/* Design Selection buttons */}
      {isVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9998] w-[80vw] max-w-3xl">
          <ScrollArea className="w-full">
            <div className="flex gap-2 p-2">
              {themes.map((theme) => (
                <Button 
                  key={theme.id}
                  size="sm" 
                  variant={currentDesign === theme.id ? 'default' : 'secondary'}
                  onClick={() => setDesign(theme.id as any)}
                  className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    currentDesign === theme.id && "bg-songhunt-red hover:bg-red-600"
                  )}
                >
                  {theme.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <MiniPlayer onClose={hideMiniPlayer} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniPlayerWrapper;
