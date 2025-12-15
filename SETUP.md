# 🚀 Quick Setup Guide

## Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)

## Setup Steps

### 1. Install Dependencies
```powershell
npm install
```

### 2. Generate Prisma Client
```powershell
npx prisma generate
```

### 3. Initialize Database
```powershell
npx prisma db push
```

### 4. Seed Database with Games and Demo User
```powershell
npm run db:seed
```

### 5. Start Development Server
```powershell
npm run dev
```

### 6. Open in Browser
Navigate to: `http://localhost:3000`

## Demo Account
- **Email**: demo@slotmaster.com
- **Password**: demo123
- **Starting Balance**: 50,000 coins

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with games
- `npm run db:studio` - Open Prisma Studio

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can specify a different port:
```powershell
$env:PORT=3001; npm run dev
```

### Database Issues
If you encounter database issues, delete the database file and recreate:
```powershell
Remove-Item prisma\dev.db -ErrorAction SilentlyContinue
npx prisma db push
npm run db:seed
```

### Module Not Found Errors
Make sure all dependencies are installed:
```powershell
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

## Project URLs
- **Home**: http://localhost:3000
- **Games**: http://localhost:3000/games
- **Wallet**: http://localhost:3000/wallet
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **About**: http://localhost:3000/about

## Environment Variables
The `.env` file is already configured with default values:
- `DATABASE_URL`: SQLite database location
- `JWT_SECRET`: Secret key for JWT tokens (change in production!)
- `INITIAL_COINS`: Welcome bonus (10,000)
- `DAILY_BONUS_COINS`: Daily claim amount (1,000)

## Features to Test
1. ✅ Register new account → Get 10,000 welcome coins
2. ✅ Login with demo account
3. ✅ Browse games page
4. ✅ Play any slot game
5. ✅ Check paytable modal
6. ✅ Claim daily bonus in wallet
7. ✅ Check balance updates after spin
8. ✅ Test mobile responsiveness
9. ✅ Test logout and re-login

## What's Included
- ✅ 4 fully playable slot games
- ✅ Authentication system (register/login)
- ✅ Virtual wallet with daily bonuses
- ✅ Responsive design (mobile + desktop)
- ✅ Smooth animations
- ✅ Fair RNG system
- ✅ Play history tracking
- ✅ Modern glassmorphism UI

## Next Steps
- Customize the theme colors in `tailwind.config.ts`
- Add more games in `lib/gameConfigs.ts`
- Deploy to Vercel or your preferred platform
- Add sound effects and music
- Implement leaderboards

Enjoy! 🎰
