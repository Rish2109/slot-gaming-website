'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Users, Code, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">🎰</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
          About SlotMaster
        </h1>
        <p className="text-white/60 text-lg">
          Your destination for free, fun, and fair slot gaming
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-xl border border-primary-500/30"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Heart className="w-6 h-6 mr-2 text-primary-400" />
          Our Mission
        </h2>
        <p className="text-white/80 leading-relaxed">
          SlotMaster is dedicated to providing an entertaining, safe, and completely free slot gaming experience. 
          We believe that gaming should be fun and accessible to everyone, without the risks associated with real money gambling. 
          Our platform is designed for pure entertainment, where players can enjoy the thrill of slot machines in a risk-free environment.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: <Shield className="w-8 h-8" />,
            title: 'Safe & Fair',
            description: 'Our games use cryptographically secure random number generation to ensure fair play. No tricks, no manipulation.',
          },
          {
            icon: <Zap className="w-8 h-8" />,
            title: 'Instant Play',
            description: 'No downloads required. Play directly in your browser on any device, anytime, anywhere.',
          },
          {
            icon: <Sparkles className="w-8 h-8" />,
            title: '100% Free',
            description: 'All games are completely free to play. No hidden costs, no in-app purchases, no real money involved.',
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: 'Community First',
            description: 'Built by gamers, for gamers. We listen to our community and continuously improve the experience.',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="text-primary-400 mb-3">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-white/60 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Technology */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-400" />
          Built with Modern Technology
        </h2>
        <p className="text-white/80 mb-4 leading-relaxed">
          SlotMaster is built using cutting-edge web technologies to deliver a smooth, responsive, and visually stunning experience:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Prisma ORM', 'Zustand', 'SQLite', 'JWT Auth'].map(
            (tech, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-center text-sm font-medium"
              >
                {tech}
              </div>
            )
          )}
        </div>
      </motion.div>

      {/* Responsible Gaming */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/30"
      >
        <h2 className="text-2xl font-bold mb-4">⚠️ Important Notice</h2>
        <div className="space-y-3 text-white/80">
          <p>
            <strong>This is NOT real gambling.</strong> SlotMaster is a free-to-play entertainment platform. 
            All coins are virtual and have no real-world value.
          </p>
          <p>
            <strong>No real money involved.</strong> You cannot win or lose real money on this platform. 
            This is purely for entertainment purposes.
          </p>
          <p>
            <strong>Play responsibly.</strong> Even though this is not real gambling, we encourage healthy gaming habits. 
            Take breaks, and remember that gaming should be fun!
          </p>
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-white/60 mb-6">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            Contact Us
          </button>
          <button className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            Report Issue
          </button>
        </div>
      </motion.div>
    </div>
  );
}
