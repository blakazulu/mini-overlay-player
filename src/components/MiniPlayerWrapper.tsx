
import React from 'react';
import MiniPlayer from './MiniPlayer';
import { useMiniPlayer } from '@/contexts/MiniPlayerContext';
import { AnimatePresence, motion } from 'framer-motion';

const MiniPlayerWrapper: React.FC = () => {
  const { isVisible, hideMiniPlayer } = useMiniPlayer();

  return (
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
  );
};

export default MiniPlayerWrapper;
