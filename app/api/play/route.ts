import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { SlotEngine } from '@/lib/gameEngine';
import { getGameById } from '@/lib/gameConfigs';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { gameId, bet } = await request.json();

    // Validation
    if (!gameId || !bet) {
      return NextResponse.json(
        { message: 'Game ID and bet are required' },
        { status: 400 }
      );
    }

    if (typeof bet !== 'number' || bet <= 0) {
      return NextResponse.json(
        { message: 'Invalid bet amount' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check balance
    if (user.coins < bet) {
      return NextResponse.json(
        { message: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Get game config
    const gameConfig = getGameById(gameId);

    if (!gameConfig) {
      return NextResponse.json(
        { message: 'Game not found' },
        { status: 404 }
      );
    }

    // Validate bet range
    if (bet < gameConfig.minBet || bet > gameConfig.maxBet) {
      return NextResponse.json(
        { message: `Bet must be between ${gameConfig.minBet} and ${gameConfig.maxBet}` },
        { status: 400 }
      );
    }

    // Create game engine and spin
    const engine = new SlotEngine(gameConfig);
    const result = engine.spin(bet);

    // Calculate new balance
    const newBalance = user.coins - bet + result.totalWin;

    // Update user balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { coins: newBalance },
    });

    // Save play history
    await prisma.playHistory.create({
      data: {
        userId: user.id,
        gameId: gameConfig.id,
        bet,
        win: result.totalWin,
        result: JSON.stringify(result),
      },
    });

    return NextResponse.json({
      result,
      balance: updatedUser.coins,
      netWin: result.totalWin - bet,
    });
  } catch (error) {
    console.error('Play error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
