import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  isLoading?: boolean;
  onLoaded?: () => void;
  children?: React.ReactNode;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading: externalIsLoading,
  onLoaded,
  children,
  minDurationMs = 2000,
}) => {
  const [internalLoading, setInternalLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isControlled = typeof externalIsLoading === 'boolean';
  const showLoading = isControlled ? externalIsLoading : internalLoading;

  useEffect(() => {
    // Attempt instant autoplay on mount
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or video load error:', err);
      });
    }

    const timer = setTimeout(() => {
      if (!isControlled) {
        setInternalLoading(false);
      }
      if (onLoaded) onLoaded();
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [minDurationMs, isControlled, onLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && (
          <motion.div
            key="monix-loading-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, ease: 'easeInOut' } 
            }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#000000] m-0 p-0 overflow-hidden select-none pointer-events-auto"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#000000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 0,
              padding: 0,
              overflow: 'hidden'
            }}
          >
            {/* Seamless, borderless centered compact video */}
            <video
              ref={videoRef}
              src="/assets/load.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="block pointer-events-none"
              style={{
                maxWidth: '180px',
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'transparent',
                display: 'block'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Root Layout Children */}
      {children}
    </>
  );
};
