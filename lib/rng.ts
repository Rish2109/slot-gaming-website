/**
 * Cryptographically secure random number generator
 * Uses Web Crypto API for deterministic, fair RNG
 */
export class SecureRNG {
  /**
   * Generate a random integer between min (inclusive) and max (inclusive)
   */
  static randomInt(min: number, max: number): number {
    const range = max - min + 1;
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    const maxValue = Math.pow(256, bytesNeeded);
    const cutoff = Math.floor(maxValue / range) * range;

    let randomValue: number;
    do {
      const randomBytes = new Uint8Array(bytesNeeded);
      if (typeof window !== 'undefined') {
        crypto.getRandomValues(randomBytes);
      } else {
        // Server-side: use Node crypto
        const nodeCrypto = require('crypto');
        nodeCrypto.randomFillSync(randomBytes);
      }
      
      randomValue = 0;
      for (let i = 0; i < bytesNeeded; i++) {
        randomValue = randomValue * 256 + randomBytes[i];
      }
    } while (randomValue >= cutoff);

    return min + (randomValue % range);
  }

  /**
   * Generate a random float between 0 (inclusive) and 1 (exclusive)
   */
  static random(): number {
    return this.randomInt(0, Number.MAX_SAFE_INTEGER) / Number.MAX_SAFE_INTEGER;
  }

  /**
   * Shuffle an array using Fisher-Yates algorithm
   */
  static shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.randomInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  /**
   * Pick a random element from an array
   */
  static pick<T>(array: T[]): T {
    return array[this.randomInt(0, array.length - 1)];
  }

  /**
   * Pick a random element based on weights
   */
  static weightedPick<T>(items: T[], weights: number[]): T {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = this.random() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return items[i];
      }
    }
    
    return items[items.length - 1];
  }
}
