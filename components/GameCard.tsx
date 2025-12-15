'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GameConfig } from '@/lib/gameEngine';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: GameConfig;
}

export default function GameCard({ game }: GameCardProps) {
  const getGameEmoji = (id: string) => {
    switch (id) {
      case 'classic-slot':
        return '🎰';
      case 'fruit-slot':
        return '🍒';
      case 'modern-slot':
        return '💎';
      case 'wild-bonus':
        return '🃏';
      default:
        return '🎲';
    }
  };

  const getGameDescription = (id: string) => {
    switch (id) {
      case 'classic-slot':
        return 'Traditional 3-reel slot with classic symbols';
      case 'fruit-slot':
        return 'Fruity fun with juicy rewards';
      case 'modern-slot':
        return '5-reel modern slot with premium symbols';
      case 'wild-bonus':
        return 'Wild cards and massive bonus multipliers';
      default:
        return 'Exciting slot game';
    }
  };

  return (
    <Link href={`/games/${game.id}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-primary-400/50 transition-all duration-300"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative p-6">
          {/* Game Icon */}
          <div className="text-6xl mb-4 text-center">
            {getGameEmoji(game.id)}
          </div>

          {/* Game Info */}
          <h3 className="text-xl font-bold text-white text-center mb-2">
            {game.name}
          </h3>
          <p className="text-white/60 text-sm text-center mb-4">
            {getGameDescription(game.id)}
          </p>

          {/* Game Stats */}
          <div className="flex justify-between items-center text-xs text-white/50 mb-4">
            <span>{game.reelCount} Reels</span>
            <span>Min: {game.minBet} 🪙</span>
          </div>

          {/* Play Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold"
          >
            <Play size={18} />
            <span>Play Now</span>
          </motion.div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </Link>
  );
}
