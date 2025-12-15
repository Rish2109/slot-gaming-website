import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user can claim (24 hours since last claim)
    const now = new Date();
    const lastClaim = user.lastDailyClaim;
    
    if (lastClaim) {
      const hoursSinceLastClaim = (now.getTime() - lastClaim.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastClaim < 24) {
        return NextResponse.json(
          { message: 'Daily bonus already claimed. Try again tomorrow!' },
          { status: 400 }
        );
      }
    }

    // Grant daily bonus
    const dailyBonus = parseInt(process.env.DAILY_BONUS_COINS || '1000');
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        coins: user.coins + dailyBonus,
        lastDailyClaim: now,
      },
    });

    return NextResponse.json({
      message: `Daily bonus of ${dailyBonus} coins claimed!`,
      coins: updatedUser.coins,
      bonus: dailyBonus,
    });
  } catch (error) {
    console.error('Daily claim error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
