import { PrismaClient } from '@prisma/client';
import { GAMES } from '../lib/gameConfigs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.playHistory.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('✅ Cleared existing data');

  // Create games
  for (const game of GAMES) {
    await prisma.game.create({
      data: {
        id: game.id,
        name: game.name,
        slug: game.id,
        description: getGameDescription(game.id),
        thumbnail: getGameThumbnail(game.id),
        reelCount: game.reelCount,
        symbolsPerReel: game.symbolsPerReel,
        symbols: JSON.stringify(game.symbols),
        paytable: JSON.stringify(game.paytable),
        minBet: game.minBet,
        maxBet: game.maxBet,
      },
    });
  }

  console.log(`✅ Created ${GAMES.length} games`);

  // Create demo user
  const bcrypt = require('bcryptjs');
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@slotmaster.com',
      passwordHash: await bcrypt.hash('demo123', 10),
      coins: 50000,
    },
  });

  console.log('✅ Created demo user (email: demo@slotmaster.com, password: demo123)');

  console.log('🎉 Database seeded successfully!');
}

function getGameDescription(id: string): string {
  switch (id) {
    case 'classic-slot':
      return 'Traditional 3-reel slot machine with classic symbols. Simple and nostalgic!';
    case 'fruit-slot':
      return 'Juicy fruit-themed slot with colorful symbols and sweet rewards.';
    case 'modern-slot':
      return '5-reel modern slot featuring premium symbols and bigger wins.';
    case 'wild-bonus':
      return 'Exciting 5-reel slot with wild cards and massive bonus multipliers!';
    default:
      return 'Exciting slot game with great rewards!';
  }
}

function getGameThumbnail(id: string): string {
  switch (id) {
    case 'classic-slot':
      return '/games/classic.png';
    case 'fruit-slot':
      return '/games/fruit.png';
    case 'modern-slot':
      return '/games/modern.png';
    case 'wild-bonus':
      return '/games/wild.png';
    default:
      return '/games/default.png';
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
