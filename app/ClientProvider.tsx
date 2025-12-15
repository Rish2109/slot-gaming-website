'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useWalletStore } from '@/store/useWalletStore';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const checkClaimStatus = useWalletStore((state) => state.checkClaimStatus);
  const setBalance = useWalletStore((state) => state.setBalance);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      setBalance(user.coins);
      checkClaimStatus();
    }
  }, [user, setBalance, checkClaimStatus]);

  return <>{children}</>;
}
