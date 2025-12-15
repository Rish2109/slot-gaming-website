'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameConfig, SpinResult } from '@/lib/gameEngine';
import { useAuthStore } from '@/store/useAuthStore';
import Reel from './Reel';
import PaytableModal from './PaytableModal';
import { Info, Coins } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface SlotMachineProps {
  game: GameConfig;
}

const BET_OPTIONS = [10, 50, 100];

export default function SlotMachine({ game }: SlotMachineProps) {
  const { user, updateCoins } = useAuthStore();
  const [selectedBet, setSelectedBet] = useState(BET_OPTIONS[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [showPaytable, setShowPaytable] = useState(false);
  const [balance, setBalance] = useState(user?.coins || 0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setBalance(user.coins);
    }
  }, [user]);

  const handleSpin = async () => {
    if (isSpinning) return;
    if (balance < selectedBet) {
      setMessage('Insufficient balance!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    setIsSpinning(true);
    setMessage('');
    setResult(null);

    try {
      const response = await fetch('/api/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: game.id,
          bet: selectedBet,
        }),
      });

      if (!response.ok) {
        throw new Error('Spin failed');
      }

      const data = await response.json();
      
      // Wait for animation
      setTimeout(() => {
        setResult(data.result);
        setBalance(data.balance);
        updateCoins(data.balance);
        
        if (data.result.totalWin > 0) {
          setMessage(`You won ${formatNumber(data.result.totalWin)} coins! 🎉`);
        } else {
          setMessage('Try again!');
        }
        
        setTimeout(() => {
          setIsSpinning(false);
        }, 500);
      }, 1000);
    } catch (error) {
      console.error('Spin error:', error);
      setMessage('Error occurred. Please try again.');
      setIsSpinning(false);
    }
  };

  const symbols = result?.symbols || game.symbols.slice(0, game.reelCount).map(s => s.id);
  const hasWin = result && result.totalWin > 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Balance Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <div className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30">
          <Coins className="w-6 h-6 text-primary-400" />
          <div>
            <div className="text-xs text-white/60">Balance</div>
            <div className="text-xl font-bold text-white">
              {formatNumber(balance)} 🪙
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowPaytable(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Info size={18} />
          <span>Paytable</span>
        </button>
      </motion.div>

      {/* Slot Machine */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        {/* Game Title */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
          {game.name}
        </h2>

        {/* Reels */}
        <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-6">
          {symbols.map((symbolId, index) => (
            <Reel
              key={index}
              symbols={game.symbols}
              result={symbolId}
              isSpinning={isSpinning}
              delay={index * 0.1}
              isWinning={hasWin}
            />
          ))}
        </div>

        {/* Win Line Indicator */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-primary-400/30 pointer-events-none" />

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-center text-lg font-semibold mb-4 ${
                result && result.totalWin > 0 ? 'text-primary-400' : 'text-white/80'
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bet Selector */}
        <div className="mb-6">
          <div className="text-center text-white/60 text-sm mb-3">Select Bet</div>
          <div className="flex justify-center space-x-4">
            {BET_OPTIONS.map((bet) => (
              <motion.button
                key={bet}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBet(bet)}
                disabled={isSpinning}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedBet === bet
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {bet} 🪙
              </motion.button>
            ))}
          </div>
        </div>

        {/* Spin Button */}
        <motion.button
          whileHover={{ scale: isSpinning ? 1 : 1.05 }}
          whileTap={{ scale: isSpinning ? 1 : 0.95 }}
          onClick={handleSpin}
          disabled={isSpinning || balance < selectedBet}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            isSpinning
              ? 'bg-white/20 cursor-not-allowed'
              : balance < selectedBet
              ? 'bg-red-500/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
          }`}
        >
          {isSpinning ? '🎰 SPINNING...' : balance < selectedBet ? 'INSUFFICIENT BALANCE' : '🎰 SPIN'}
        </motion.button>
      </motion.div>

      {/* Paytable Modal */}
      <PaytableModal
        game={game}
        isOpen={showPaytable}
        onClose={() => setShowPaytable(false)}
      />
    </div>
  );
}
