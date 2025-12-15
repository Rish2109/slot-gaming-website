import { create } from 'zustand';

interface WalletState {
  balance: number;
  lastClaim: Date | null;
  canClaim: boolean;
  isLoading: boolean;
  setBalance: (balance: number) => void;
  claimDailyBonus: () => Promise<void>;
  checkClaimStatus: () => Promise<void>;
  deductBet: (amount: number) => void;
  addWinnings: (amount: number) => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 0,
  lastClaim: null,
  canClaim: false,
  isLoading: false,

  setBalance: (balance) => set({ balance }),

  claimDailyBonus: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/wallet/claim-daily', {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Claim failed');
      }

      const data = await response.json();
      set({
        balance: data.coins,
        lastClaim: new Date(),
        canClaim: false,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  checkClaimStatus: async () => {
    try {
      const response = await fetch('/api/wallet/claim-status');
      
      if (response.ok) {
        const data = await response.json();
        set({
          canClaim: data.canClaim,
          lastClaim: data.lastClaim ? new Date(data.lastClaim) : null,
        });
      }
    } catch {
      // Silently fail
    }
  },

  deductBet: (amount) =>
    set((state) => ({
      balance: Math.max(0, state.balance - amount),
    })),

  addWinnings: (amount) =>
    set((state) => ({
      balance: state.balance + amount,
    })),
}));
