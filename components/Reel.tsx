'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Symbol } from '@/lib/gameEngine';

interface ReelProps {
  symbols: Symbol[];
  result: string;
  isSpinning: boolean;
  delay: number;
  isWinning?: boolean | null;
}

export default function Reel({ symbols, result, isSpinning, delay, isWinning }: ReelProps) {
  const resultSymbol = symbols.find(s => s.id === result);

  return (
    <div className="relative w-20 h-24 md:w-24 md:h-32 bg-black/40 rounded-lg border-2 border-primary-500/30 overflow-hidden">
      <AnimatePresence mode="wait">
        {isSpinning ? (
          <motion.div
            key="spinning"
            initial={{ y: 0 }}
            animate={{
              y: [0, -300, 0],
            }}
            transition={{
              duration: 0.8,
              delay: delay,
              ease: [0.34, 1.56, 0.64, 1],
              repeat: 0,
            }}
            className="absolute inset-0 flex flex-col items-center justify-around"
          >
            {symbols.slice(0, 5).map((symbol, index) => (
              <div
                key={`spin-${index}`}
                className="text-4xl md:text-5xl"
              >
                {symbol.icon}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`result-${result}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              delay: delay + 0.8,
            }}
            className={`absolute inset-0 flex items-center justify-center text-5xl md:text-6xl ${
              isWinning ? 'animate-glow' : ''
            }`}
          >
            {resultSymbol?.icon || '?'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Winning Glow */}
      {isWinning && !isSpinning && (
        <motion.div
          className="absolute inset-0 border-4 border-primary-400 rounded-lg"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}
