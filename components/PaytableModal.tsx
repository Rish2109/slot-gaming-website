'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GameConfig } from '@/lib/gameEngine';
import { X } from 'lucide-react';

interface PaytableModalProps {
  game: GameConfig;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaytableModal({ game, isOpen, onClose }: PaytableModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/20 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                  {game.name} - Paytable
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                {/* Game Info */}
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/60">Reels</div>
                      <div className="font-semibold">{game.reelCount}</div>
                    </div>
                    <div>
                      <div className="text-white/60">Min Bet</div>
                      <div className="font-semibold">{game.minBet} 🪙</div>
                    </div>
                    <div>
                      <div className="text-white/60">Max Bet</div>
                      <div className="font-semibold">{game.maxBet} 🪙</div>
                    </div>
                    <div>
                      <div className="text-white/60">Symbols</div>
                      <div className="font-semibold">{game.symbols.length}</div>
                    </div>
                  </div>
                </div>

                {/* Symbols */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary-400">Symbols</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {game.symbols.map((symbol) => (
                      <div
                        key={symbol.id}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                      >
                        <span className="text-3xl">{symbol.icon}</span>
                        <div>
                          <div className="font-semibold text-sm">{symbol.name}</div>
                          <div className="text-xs text-white/50">
                            Weight: {symbol.weight}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payouts */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary-400">Winning Combinations</h3>
                  <div className="space-y-2">
                    {game.paytable
                      .sort((a, b) => b.multiplier - a.multiplier)
                      .map((payout, index) => {
                        const symbolIcons = payout.symbols.map(symbolId => {
                          const symbol = game.symbols.find(s => s.id === symbolId);
                          return symbol?.icon || '?';
                        });

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1 text-2xl">
                                {game.reelCount === 3 ? (
                                  <>
                                    {symbolIcons[0]} {symbolIcons[0]} {symbolIcons[0]}
                                  </>
                                ) : (
                                  <>
                                    {symbolIcons[0]} {symbolIcons[0]} {symbolIcons[0]} + more
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-lg font-bold text-primary-400">
                                {payout.multiplier}x
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Note */}
                <div className="mt-6 p-4 rounded-xl bg-primary-500/10 border border-primary-500/30">
                  <p className="text-sm text-white/80">
                    <strong>Note:</strong> Wins are calculated based on the center line.
                    Match {game.reelCount === 3 ? '3' : 'at least 3'} symbols to win!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
