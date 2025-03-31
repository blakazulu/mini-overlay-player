
import React from 'react';
import MiniPlayer from './MiniPlayer';
import { useMiniPlayer } from '@/contexts/MiniPlayerContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/button';

const MiniPlayerWrapper: React.FC = () => {
  const { isVisible, hideMiniPlayer, currentDesign, setDesign } = useMiniPlayer();

  return (
    <>
      {/* Design Selection buttons */}
      {isVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9998] flex gap-2">
          <Button 
            size="sm" 
            variant={currentDesign === 'cyber' ? 'default' : 'secondary'}
            onClick={() => setDesign('cyber')}
            className="text-xs"
          >
            Cyber
          </Button>
          <Button 
            size="sm" 
            variant={currentDesign === 'neon' ? 'default' : 'secondary'}
            onClick={() => setDesign('neon')}
            className="text-xs"
          >
            Neon
          </Button>
          <Button 
            size="sm" 
            variant={currentDesign === 'hologram' ? 'default' : 'secondary'}
            onClick={() => setDesign('hologram')}
            className="text-xs"
          >
            Hologram
          </Button>
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
