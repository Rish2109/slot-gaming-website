'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useWalletStore } from '@/store/useWalletStore';
import Link from 'next/link';
import { Coins, Gift, TrendingUp, Clock, Lock } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function WalletPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { balance, canClaim, lastClaim, claimDailyBonus, checkClaimStatus, isLoading: claiming } = useWalletStore();
  const [message, setMessage] = useState('');
  const [timeUntilNextClaim, setTimeUntilNextClaim] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      checkClaimStatus();
    }
  }, [isAuthenticated, checkClaimStatus]);

  useEffect(() => {
    if (lastClaim && !canClaim) {
      const interval = setInterval(() => {
        const now = new Date();
        const nextClaim = new Date(lastClaim);
        nextClaim.setHours(nextClaim.getHours() + 24);
        const diff = nextClaim.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeUntilNextClaim('Available now!');
          checkClaimStatus();
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeUntilNextClaim(`${hours}h ${minutes}m`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastClaim, canClaim, checkClaimStatus]);

  const handleClaim = async () => {
    setMessage('');
    try {
      await claimDailyBonus();
      setMessage('Daily bonus claimed successfully! 🎉');
    } catch (error: any) {
      setMessage(error.message || 'Failed to claim bonus');
    }
  };

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
            Please login to access your wallet
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
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
          Your Wallet
        </h1>
        <p className="text-white/60 text-lg">
          Manage your coins and claim daily bonuses
        </p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-xl border border-primary-500/30 text-center"
      >
        <Coins className="w-16 h-16 mx-auto mb-4 text-primary-400" />
        <div className="text-white/60 mb-2">Current Balance</div>
        <div className="text-5xl md:text-6xl font-bold text-white mb-2">
          {formatNumber(user?.coins || balance)} 🪙
        </div>
        <div className="text-white/40 text-sm">Free Play Coins</div>
      </motion.div>

      {/* Daily Bonus Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Gift className="w-8 h-8 text-primary-400" />
            <div>
              <h3 className="text-xl font-bold">Daily Bonus</h3>
              <p className="text-white/60 text-sm">Claim 1,000 free coins every 24 hours</p>
            </div>
          </div>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-4 rounded-lg ${
              message.includes('successfully')
                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                : 'bg-red-500/20 border border-red-500/50 text-red-300'
            }`}
          >
            {message}
          </motion.div>
        )}

        {canClaim ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClaim}
            disabled={claiming}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {claiming ? 'Claiming...' : '🎁 Claim Daily Bonus'}
          </motion.button>
        ) : (
          <div className="text-center p-4 rounded-xl bg-white/5">
            <Clock className="w-8 h-8 mx-auto mb-2 text-white/40" />
            <div className="text-white/60 text-sm mb-1">Next claim available in:</div>
            <div className="text-xl font-bold text-white">{timeUntilNextClaim}</div>
          </div>
        )}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary-400" />
          <div className="text-2xl font-bold text-white mb-1">
            {formatNumber(user?.coins || balance)}
          </div>
          <div className="text-white/60 text-sm">Total Balance</div>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
          <Gift className="w-8 h-8 mx-auto mb-2 text-secondary-400" />
          <div className="text-2xl font-bold text-white mb-1">
            {canClaim ? 'Ready!' : 'Pending'}
          </div>
          <div className="text-white/60 text-sm">Daily Bonus</div>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
          <Coins className="w-8 h-8 mx-auto mb-2 text-primary-400" />
          <div className="text-2xl font-bold text-white mb-1">10,000</div>
          <div className="text-white/60 text-sm">Welcome Bonus</div>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-white/5 border border-white/10"
      >
        <h3 className="font-bold mb-3">How to Get More Coins</h3>
        <ul className="space-y-2 text-white/60 text-sm">
          <li>• Claim your daily bonus every 24 hours</li>
          <li>• Play games and build your balance</li>
          <li>• Win big on slot machines with lucky spins</li>
          <li>• All coins are for free play only - no real money involved</li>
        </ul>
      </motion.div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/games">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 font-bold text-lg"
          >
            🎰 Play Games
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
