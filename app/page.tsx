'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { Sparkles, Zap, Shield, Gift } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuthStore();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-300 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Welcome to SlotMaster
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Experience the thrill of free slot games. No real money, just pure entertainment!
          </p>
          
          {!isAuthenticated && !isLoading && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-lg font-bold shadow-lg shadow-primary-500/50"
                >
                  🎰 Start Playing Free
                </motion.button>
              </Link>
              <Link href="/games">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-lg font-semibold backdrop-blur-lg"
                >
                  View Games
                </motion.button>
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <Link href="/games">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-lg font-bold shadow-lg shadow-primary-500/50"
              >
                🎰 Play Now
              </motion.button>
            </Link>
          )}
        </motion.div>

        {/* Animated Slot Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-4 text-6xl"
        >
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            🎰
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          >
            💎
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          >
            🍒
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            🃏
          </motion.span>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Sparkles className="w-8 h-8" />,
            title: 'Free to Play',
            description: 'No real money required. Enjoy unlimited gaming!',
          },
          {
            icon: <Zap className="w-8 h-8" />,
            title: 'Instant Play',
            description: 'No downloads. Play directly in your browser.',
          },
          {
            icon: <Gift className="w-8 h-8" />,
            title: 'Daily Bonuses',
            description: 'Claim free coins every 24 hours.',
          },
          {
            icon: <Shield className="w-8 h-8" />,
            title: '100% Safe',
            description: 'Fair RNG system. No gambling involved.',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 text-primary-400 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-white/60">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Games Preview */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
            Featured Games
          </h2>
          <p className="text-white/60">
            Choose from our exciting collection of slot games
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['🎰 Classic', '🍒 Fruit', '💎 Modern', '🃏 Wild'].map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 flex items-center justify-center text-2xl font-bold"
            >
              {game}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/games">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold"
            >
              View All Games →
            </motion.button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && !isLoading && (
        <section className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-lg border border-primary-500/30"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Spin?</h2>
            <p className="text-white/80 mb-6">
              Join thousands of players and get 10,000 free coins to start!
            </p>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-lg font-bold"
              >
                Sign Up Now - It's Free!
              </motion.button>
            </Link>
          </motion.div>
        </section>
      )}
    </div>
  );
}
