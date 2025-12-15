'use client';

import { motion } from 'framer-motion';
import { GAMES } from '@/lib/gameConfigs';
import GameCard from '@/components/GameCard';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function GamesPage() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <Lock className="w-16 h-16 mx-auto mb-4 text-primary-400" />
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-white/60 mb-6">
            Please login or create an account to play our games
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 font-semibold"
              >
                Login
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 font-semibold"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
          Choose Your Game
        </h1>
        <p className="text-white/60 text-lg">
          Select from our collection of exciting slot games
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {GAMES.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
