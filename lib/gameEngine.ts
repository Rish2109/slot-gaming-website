import { SecureRNG } from './rng';

export interface Symbol {
  id: string;
  name: string;
  icon: string;
  weight: number;
}

export interface PayoutRule {
  symbols: string[];
  multiplier: number;
}

export interface GameConfig {
  id: string;
  name: string;
  reelCount: number;
  symbolsPerReel: number;
  symbols: Symbol[];
  paytable: PayoutRule[];
  minBet: number;
  maxBet: number;
}

export interface SpinResult {
  reels: string[][];
  winningLines: WinningLine[];
  totalWin: number;
  symbols: string[];
}

export interface WinningLine {
  symbols: string[];
  multiplier: number;
  payout: number;
}

export class SlotEngine {
  private config: GameConfig;

  constructor(config: GameConfig) {
    this.config = config;
  }

  /**
   * Generate a random reel
   */
  private generateReel(): string[] {
    const reel: string[] = [];
    for (let i = 0; i < this.config.symbolsPerReel; i++) {
      const symbol = SecureRNG.weightedPick(
        this.config.symbols.map(s => s.id),
        this.config.symbols.map(s => s.weight)
      );
      reel.push(symbol);
    }
    return reel;
  }

  /**
   * Spin the reels and generate result
   */
  spin(bet: number): SpinResult {
    // Validate bet
    if (bet < this.config.minBet || bet > this.config.maxBet) {
      throw new Error(`Bet must be between ${this.config.minBet} and ${this.config.maxBet}`);
    }

    // Generate reels
    const reels: string[][] = [];
    for (let i = 0; i < this.config.reelCount; i++) {
      reels.push(this.generateReel());
    }

    // Get center line symbols
    const centerLineIndex = Math.floor(this.config.symbolsPerReel / 2);
    const symbols = reels.map(reel => reel[centerLineIndex]);

    // Check for wins
    const winningLines = this.checkWins(symbols, bet);
    const totalWin = winningLines.reduce((sum, line) => sum + line.payout, 0);

    return {
      reels,
      symbols,
      winningLines,
      totalWin,
    };
  }

  /**
   * Check for winning combinations
   */
  private checkWins(symbols: string[], bet: number): WinningLine[] {
    const wins: WinningLine[] = [];

    for (const rule of this.config.paytable) {
      // Check if all symbols match the rule
      const matches = this.matchesRule(symbols, rule.symbols);
      
      if (matches) {
        wins.push({
          symbols: rule.symbols,
          multiplier: rule.multiplier,
          payout: bet * rule.multiplier,
        });
      }
    }

    return wins;
  }

  /**
   * Check if symbols match a paytable rule
   */
  private matchesRule(symbols: string[], ruleSymbols: string[]): boolean {
    // Handle wildcard patterns
    if (ruleSymbols.includes('*')) {
      // All same symbol
      return symbols.every(s => s === symbols[0]);
    }

    // For 3-reel: check if all 3 match
    if (this.config.reelCount === 3 && ruleSymbols.length === 1) {
      return symbols.every(s => s === ruleSymbols[0]);
    }

    // For 5-reel: check various patterns
    if (this.config.reelCount === 5) {
      // At least 3 matching
      if (ruleSymbols.length === 1) {
        const matchCount = symbols.filter(s => s === ruleSymbols[0]).length;
        return matchCount >= 3;
      }
      
      // Specific pattern
      return symbols.every((s, i) => s === ruleSymbols[i] || ruleSymbols[i] === 'WILD');
    }

    return false;
  }

  /**
   * Get theoretical RTP (Return to Player)
   */
  getRTP(): number {
    // Simplified RTP calculation
    let expectedReturn = 0;
    const totalWeight = this.config.symbols.reduce((sum, s) => sum + s.weight, 0);

    for (const rule of this.config.paytable) {
      // Calculate probability of this combination
      let probability = 1;
      for (let i = 0; i < this.config.reelCount; i++) {
        const symbol = this.config.symbols.find(s => s.id === rule.symbols[0]);
        if (symbol) {
          probability *= symbol.weight / totalWeight;
        }
      }
      expectedReturn += probability * rule.multiplier;
    }

    return expectedReturn;
  }
}

/**
 * Helper to create game configurations
 */
export function createGameConfig(
  id: string,
  name: string,
  reelCount: number,
  symbols: Symbol[],
  paytable: PayoutRule[],
  minBet = 10,
  maxBet = 100
): GameConfig {
  return {
    id,
    name,
    reelCount,
    symbolsPerReel: 3,
    symbols,
    paytable,
    minBet,
    maxBet,
  };
}
