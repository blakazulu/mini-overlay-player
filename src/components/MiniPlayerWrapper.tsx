
import React from 'react';
import MiniPlayer from './MiniPlayer';
import { useMiniPlayer } from '@/contexts/MiniPlayerContext';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';

const MiniPlayerWrapper: React.FC = () => {
  const { isVisible, hideMiniPlayer, currentDesign, setDesign } = useMiniPlayer();

  const themes = [
    { id: 'counterstrike2', name: 'Counter-Strike 2' },
    { id: 'csgo', name: 'CSGO' },
    { id: 'minecraft', name: 'Minecraft' },
    { id: 'fortnite', name: 'Fortnite' },
    { id: 'sims4', name: 'The Sims 4' },
    { id: 'roblox', name: 'ROBLOX' },
    { id: 'marvelrivals', name: 'Marvel Rivals' },
    { id: 'lol', name: 'League of Legends' },
    { id: 'dota', name: 'Dota 2' },
    { id: 'valorant', name: 'Valorant' },
    { id: 'pubg', name: 'PUBG: BATTLEGROUNDS' },
    { id: 'overwatch', name: 'Overwatch' },
    { id: 'rainbow6', name: 'Rainbow Six Siege' },
    { id: 'warzone', name: 'Call of Duty: Warzone' },
    { id: 'rocketleague', name: 'Rocket League' }
  ];

  return (
    <>
      {/* Design Selection dropdown */}
      {isVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9998] w-[250px]">
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-2">
            <Select
              value={currentDesign}
              onValueChange={(value) => setDesign(value as any)}
            >
              <SelectTrigger className="w-full bg-black/70 text-white border-zinc-700">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 text-white border-zinc-700">
                {themes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id} className="hover:bg-zinc-700 focus:bg-zinc-700 text-white">
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[9997]"
          >
            <MiniPlayer onClose={hideMiniPlayer} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniPlayerWrapper;
