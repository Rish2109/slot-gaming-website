# 🎰 SlotMaster - Free Online Slot Gaming Website

A modern, fully responsive, free-to-play slot gaming website built with Next.js 14, TypeScript, and cutting-edge web technologies. Inspired by professional casino gaming sites but designed for pure entertainment with zero real money gambling.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## ✨ Features

### 🎮 Gaming Experience
- **4 Unique Slot Games**: Classic 3-reel, Fruit Mania, Diamond Fortune (5-reel), Wild Jackpot
- **Smooth Animations**: Powered by Framer Motion for buttery-smooth reel spins
- **Mobile-First Design**: Perfectly responsive on all devices
- **Real-time Updates**: Instant balance updates and win animations

### 💰 Virtual Wallet System
- **10,000 Welcome Bonus**: New users start with virtual coins
- **Daily Free Coins**: Claim 1,000 coins every 24 hours
- **Persistent Balance**: Your coins are saved across sessions

### 🔐 Authentication & Security
- **JWT-based Auth**: Secure HTTP-only cookie authentication
- **Password Hashing**: Bcrypt encryption for user passwords
- **Protected Routes**: Server-side authentication middleware

### 🎲 Fair Gaming Engine
- **Cryptographically Secure RNG**: Using Web Crypto API
- **Configurable Paytables**: Each game has unique win conditions
- **Transparent Mechanics**: All game logic is deterministic and auditable

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects
- **Dark Theme**: Easy on the eyes with vibrant accent colors
- **Micro-interactions**: Hover effects, scale animations, and smooth transitions
- **Loading States**: Skeleton loaders and loading indicators

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: JWT + HTTP-only cookies
- **Password Hashing**: bcryptjs

### Game Engine
- **RNG**: Crypto-safe random number generation
- **Logic**: Pure TypeScript
- **Rendering**: CSS animations + Canvas API

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd "Game Website"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXT_PUBLIC_APP_NAME="SlotMaster"
INITIAL_COINS=10000
DAILY_BONUS_COINS=1000
```

### Step 4: Initialize Database
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Step 5: Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app! 🎉

---

## 🎮 How to Play

### 1. Register an Account
- Navigate to the Sign Up page
- Enter your email and password
- Get 10,000 free welcome coins instantly!

### 2. Choose a Game
- Browse the Games page
- Select from 4 exciting slot games
- Each game has unique symbols and paytables

### 3. Place Your Bet
- Choose your bet amount (10, 50, or 100 coins)
- Click the "SPIN" button
- Watch the reels spin and see if you win!

### 4. Claim Daily Bonuses
- Visit the Wallet page
- Claim 1,000 free coins every 24 hours
- Never run out of coins!

### Demo Account
- **Email**: demo@slotmaster.com
- **Password**: demo123
- **Starting Balance**: 50,000 coins

---

## 📂 Project Structure

```
Game Website/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (login, register)
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── play/           # Game play endpoint
│   │   └── wallet/         # Wallet endpoints
│   ├── games/              # Games pages
│   │   └── [id]/          # Individual game page
│   ├── wallet/             # Wallet page
│   ├── about/              # About page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer
│   ├── GameCard.tsx        # Game preview card
│   ├── SlotMachine.tsx     # Main slot machine component
│   ├── Reel.tsx            # Individual reel component
│   └── PaytableModal.tsx   # Paytable display
├── lib/                     # Utilities & logic
│   ├── auth.ts             # Authentication helpers
│   ├── prisma.ts           # Prisma client
│   ├── rng.ts              # Random number generator
│   ├── gameEngine.ts       # Slot game engine
│   ├── gameConfigs.ts      # Game configurations
│   └── utils.ts            # Utility functions
├── store/                   # Zustand stores
│   ├── useAuthStore.ts     # Authentication state
│   └── useWalletStore.ts   # Wallet state
├── prisma/                  # Database
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── public/                  # Static assets
└── package.json            # Dependencies
```

---

## 🎰 Game Mechanics

### RNG System
The game uses a cryptographically secure random number generator based on the Web Crypto API:
- **Fair & Unpredictable**: Each spin is truly random
- **Weighted Symbols**: Different symbols have different probabilities
- **No Manipulation**: Results cannot be influenced or predicted

### Win Detection
- **Center Line Wins**: Only the center row is evaluated (MVP)
- **Symbol Matching**: Match 3 symbols on 3-reel games, 3+ on 5-reel games
- **Multiplier-based Payouts**: Win = Bet × Multiplier

### Game Configurations

#### Classic Slot (3-Reel)
- Symbols: 7, BAR, Cherry, Lemon, Bell, Star
- Max Multiplier: 100x
- Min Bet: 10 coins

#### Fruit Slot (3-Reel)
- Symbols: Watermelon, Grape, Cherry, Orange, Banana, Lemon
- Max Multiplier: 50x
- Min Bet: 10 coins

#### Diamond Fortune (5-Reel)
- Symbols: Diamond, Crown, Coin, Gem, Star, Spade, Heart
- Max Multiplier: 200x
- Min Bet: 10 coins

#### Wild Jackpot (5-Reel)
- Symbols: WILD, BONUS, 7, Coin, BAR, Bell, Star
- Max Multiplier: 500x
- Min Bet: 10 coins

---

## 🔒 Security Features

### Authentication
- JWT tokens stored in HTTP-only cookies
- Server-side token verification on protected routes
- Password hashing with bcrypt (10 rounds)
- Session expiry (7 days)

### Game Integrity
- Server-side bet validation
- Balance checks before each spin
- Play history logging
- Rate limiting (can be added)

### Data Protection
- No sensitive data stored in localStorage
- HTTPS enforcement (production)
- CORS protection
- Input sanitization

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables (Production)
Update your `.env` file:
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="generate-a-strong-secret-key"
NODE_ENV="production"
```

### Recommended Platforms
- **Vercel**: Optimized for Next.js (recommended)
- **Railway**: Supports SQLite with persistent storage
- **Netlify**: Good alternative
- **DigitalOcean**: Full control with VPS

---

## 🎨 Customization

### Adding New Games
1. Define symbols in `lib/gameConfigs.ts`
2. Create paytable rules
3. Add game configuration to `GAMES` array
4. Create game thumbnail (optional)

### Changing Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#your-color',
    // ...
  }
}
```

### Modifying Coin Values
Update `.env`:
```env
INITIAL_COINS=20000
DAILY_BONUS_COINS=2000
```

---

## 📊 Database Schema

### User
- `id`: Unique identifier
- `email`: User email (unique)
- `passwordHash`: Encrypted password
- `coins`: Current balance
- `lastDailyClaim`: Timestamp of last bonus claim
- `createdAt`: Account creation date

### Game
- `id`: Game identifier
- `name`: Display name
- `slug`: URL-friendly name
- `description`: Game description
- `symbols`: JSON array of symbols
- `paytable`: JSON array of win rules
- `minBet` / `maxBet`: Betting limits

### PlayHistory
- `id`: Play record ID
- `userId`: Player reference
- `gameId`: Game reference
- `bet`: Amount wagered
- `win`: Amount won
- `result`: JSON of spin result

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with welcome bonus
- [ ] User login/logout
- [ ] Daily bonus claim (once per 24h)
- [ ] All 4 games playable
- [ ] Balance updates correctly
- [ ] Winning animations trigger
- [ ] Mobile responsiveness
- [ ] Loading states work

---

## 📝 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## ⚠️ Disclaimer

**THIS IS NOT REAL GAMBLING**

SlotMaster is a **free-to-play entertainment platform**. All coins are virtual and have **no real-world value**. You cannot win or lose real money. This application is for **entertainment purposes only**.

If you or someone you know has a gambling problem, please seek help:
- National Council on Problem Gambling: 1-800-522-4700
- GamblersAnonymous.org

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📧 Contact & Support

- **Issues**: Open a GitHub issue
- **Email**: support@slotmaster.com (example)
- **Twitter**: @SlotMasterApp (example)

---

## 🙏 Acknowledgments

- Inspired by caesarsgames.com
- Built with ❤️ using Next.js
- Icons by Lucide React
- Animations by Framer Motion

---

## 🔮 Future Enhancements

- [ ] More game varieties (Blackjack, Roulette, Poker)
- [ ] Leaderboards and achievements
- [ ] Social features (friends, chat)
- [ ] Progressive jackpots
- [ ] Tournament mode
- [ ] Sound effects and music
- [ ] Advanced statistics and history
- [ ] Multi-language support

---

**Built with 💎 by [Your Name]**

**Happy Spinning! 🎰✨**
