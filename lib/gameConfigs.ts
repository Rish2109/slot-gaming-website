import { GameConfig, Symbol, PayoutRule } from './gameEngine';

// Symbol definitions
export const CLASSIC_SYMBOLS: Symbol[] = [
  { id: 'seven', name: '7', icon: '7️⃣', weight: 5 },
  { id: 'bar', name: 'BAR', icon: '▬', weight: 10 },
  { id: 'cherry', name: 'Cherry', icon: '🍒', weight: 20 },
  { id: 'lemon', name: 'Lemon', icon: '🍋', weight: 25 },
  { id: 'bell', name: 'Bell', icon: '🔔', weight: 20 },
  { id: 'star', name: 'Star', icon: '⭐', weight: 20 },
];

export const FRUIT_SYMBOLS: Symbol[] = [
  { id: 'watermelon', name: 'Watermelon', icon: '🍉', weight: 15 },
  { id: 'grape', name: 'Grape', icon: '🍇', weight: 15 },
  { id: 'cherry', name: 'Cherry', icon: '🍒', weight: 20 },
  { id: 'lemon', name: 'Lemon', icon: '🍋', weight: 20 },
  { id: 'orange', name: 'Orange', icon: '🍊', weight: 15 },
  { id: 'banana', name: 'Banana', icon: '🍌', weight: 15 },
];

export const MODERN_SYMBOLS: Symbol[] = [
  { id: 'diamond', name: 'Diamond', icon: '💎', weight: 5 },
  { id: 'crown', name: 'Crown', icon: '👑', weight: 10 },
  { id: 'coin', name: 'Coin', icon: '🪙', weight: 15 },
  { id: 'gem', name: 'Gem', icon: '💠', weight: 15 },
  { id: 'star', name: 'Star', icon: '⭐', weight: 20 },
  { id: 'spade', name: 'Spade', icon: '♠️', weight: 15 },
  { id: 'heart', name: 'Heart', icon: '♥️', weight: 20 },
];

export const WILD_SYMBOLS: Symbol[] = [
  { id: 'wild', name: 'WILD', icon: '🃏', weight: 5 },
  { id: 'bonus', name: 'BONUS', icon: '🎁', weight: 5 },
  { id: 'coin', name: 'Coin', icon: '🪙', weight: 15 },
  { id: 'star', name: 'Star', icon: '⭐', weight: 20 },
  { id: 'bell', name: 'Bell', icon: '🔔', weight: 20 },
  { id: 'seven', name: '7', icon: '7️⃣', weight: 15 },
  { id: 'bar', name: 'BAR', icon: '▬', weight: 20 },
];

// Paytable definitions
export const CLASSIC_3_PAYTABLE: PayoutRule[] = [
  { symbols: ['seven'], multiplier: 100 },
  { symbols: ['bar'], multiplier: 50 },
  { symbols: ['cherry'], multiplier: 20 },
  { symbols: ['bell'], multiplier: 15 },
  { symbols: ['star'], multiplier: 15 },
  { symbols: ['lemon'], multiplier: 10 },
];

export const FRUIT_3_PAYTABLE: PayoutRule[] = [
  { symbols: ['watermelon'], multiplier: 50 },
  { symbols: ['grape'], multiplier: 40 },
  { symbols: ['cherry'], multiplier: 30 },
  { symbols: ['orange'], multiplier: 25 },
  { symbols: ['banana'], multiplier: 20 },
  { symbols: ['lemon'], multiplier: 15 },
];

export const MODERN_5_PAYTABLE: PayoutRule[] = [
  { symbols: ['diamond'], multiplier: 200 },
  { symbols: ['crown'], multiplier: 100 },
  { symbols: ['coin'], multiplier: 50 },
  { symbols: ['gem'], multiplier: 40 },
  { symbols: ['star'], multiplier: 30 },
  { symbols: ['spade'], multiplier: 25 },
  { symbols: ['heart'], multiplier: 20 },
];

export const WILD_5_PAYTABLE: PayoutRule[] = [
  { symbols: ['wild'], multiplier: 500 },
  { symbols: ['bonus'], multiplier: 250 },
  { symbols: ['seven'], multiplier: 100 },
  { symbols: ['coin'], multiplier: 50 },
  { symbols: ['bar'], multiplier: 40 },
  { symbols: ['bell'], multiplier: 30 },
  { symbols: ['star'], multiplier: 25 },
];

// Game configurations
export const GAMES: GameConfig[] = [
  {
    id: 'classic-slot',
    name: 'Classic Slot',
    reelCount: 3,
    symbolsPerReel: 3,
    symbols: CLASSIC_SYMBOLS,
    paytable: CLASSIC_3_PAYTABLE,
    minBet: 10,
    maxBet: 100,
  },
  {
    id: 'fruit-slot',
    name: 'Fruit Mania',
    reelCount: 3,
    symbolsPerReel: 3,
    symbols: FRUIT_SYMBOLS,
    paytable: FRUIT_3_PAYTABLE,
    minBet: 10,
    maxBet: 100,
  },
  {
    id: 'modern-slot',
    name: 'Diamond Fortune',
    reelCount: 5,
    symbolsPerReel: 3,
    symbols: MODERN_SYMBOLS,
    paytable: MODERN_5_PAYTABLE,
    minBet: 10,
    maxBet: 100,
  },
  {
    id: 'wild-bonus',
    name: 'Wild Jackpot',
    reelCount: 5,
    symbolsPerReel: 3,
    symbols: WILD_SYMBOLS,
    paytable: WILD_5_PAYTABLE,
    minBet: 10,
    maxBet: 100,
  },
];

export function getGameById(id: string): GameConfig | undefined {
  return GAMES.find(game => game.id === id);
}
