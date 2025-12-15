'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getGameById } from '@/lib/gameConfigs';
import { useAuthStore } from '@/store/useAuthStore';
import SlotMachine from '@/components/SlotMachine';
import { ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [game, setGame] = useState(getGameById(params.id as string));

  useEffect(() => {
    const foundGame = getGameById(params.id as string);
    if (!foundGame) {
      router.push('/games');
    } else {
      setGame(foundGame);
    }
  }, [params.id, router]);

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
            Please login to play this game
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

  if (!game) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Game not found</h2>
        <Link href="/games">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 font-semibold"
          >
            Back to Games
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/games">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Games</span>
        </motion.button>
      </Link>

      {/* Game */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SlotMachine game={game} />
      </motion.div>
    </div>
  );
}
