# 🏗️ SlotMaster Architecture

## System Overview

SlotMaster is a full-stack web application built with modern technologies, featuring a Next.js frontend and backend, Prisma ORM for database management, and a custom game engine for slot mechanics.

---

## Architecture Layers

```
┌─────────────────────────────────────────────────┐
│              CLIENT LAYER                        │
│  React Components + Framer Motion + Zustand     │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              API LAYER                           │
│        Next.js API Routes (REST)                 │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│           BUSINESS LOGIC LAYER                   │
│   Game Engine + Auth + Wallet Logic             │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│            DATA LAYER                            │
│        Prisma ORM + SQLite                       │
└─────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend Components

#### 1. Layout Components
- **Header.tsx**: Navigation, user info, mobile menu
- **Footer.tsx**: Links, branding, social icons
- **ClientProvider.tsx**: Auth state initialization

#### 2. Game Components
- **GameCard.tsx**: Game preview with hover effects
- **SlotMachine.tsx**: Main game interface, bet selection, spin logic
- **Reel.tsx**: Individual reel with animations
- **PaytableModal.tsx**: Win table display

#### 3. Page Components
- **page.tsx** (root): Landing page with hero and features
- **games/page.tsx**: Game selection grid
- **games/[id]/page.tsx**: Individual game player
- **wallet/page.tsx**: Balance display and daily claim
- **login/page.tsx**: Authentication form
- **register/page.tsx**: User registration
- **about/page.tsx**: Information and disclaimer

---

## State Management

### Zustand Stores

#### AuthStore (`store/useAuthStore.ts`)
```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  login: (email, password) => Promise<void>,
  register: (email, password) => Promise<void>,
  logout: () => Promise<void>,
  checkAuth: () => Promise<void>,
  updateCoins: (coins) => void
}
```

#### WalletStore (`store/useWalletStore.ts`)
```typescript
{
  balance: number,
  lastClaim: Date | null,
  canClaim: boolean,
  isLoading: boolean,
  claimDailyBonus: () => Promise<void>,
  checkClaimStatus: () => Promise<void>,
  deductBet: (amount) => void,
  addWinnings: (amount) => void
}
```

---

## API Routes

### Authentication (`/api/auth/*`)

#### POST /api/auth/register
- Creates new user account
- Hashes password with bcrypt
- Generates JWT token
- Sets HTTP-only cookie
- Returns user data

#### POST /api/auth/login
- Validates credentials
- Generates JWT token
- Sets HTTP-only cookie
- Returns user data

#### POST /api/auth/logout
- Clears auth cookie
- Returns success message

#### GET /api/auth/me
- Validates JWT token
- Returns current user data

### Wallet (`/api/wallet/*`)

#### POST /api/wallet/claim-daily
- Checks 24-hour cooldown
- Adds bonus coins to balance
- Updates lastDailyClaim timestamp
- Returns new balance

#### GET /api/wallet/claim-status
- Checks if user can claim
- Returns claim availability and last claim time

### Game (`/api/play`)

#### POST /api/play
- Validates bet amount
- Checks user balance
- Runs game engine
- Deducts bet, adds winnings
- Logs play history
- Returns spin result and new balance

### Games (`/api/games`)

#### GET /api/games
- Returns all available games
- Includes configuration and metadata

---

## Game Engine Architecture

### Core Components

#### 1. RNG System (`lib/rng.ts`)
```typescript
class SecureRNG {
  randomInt(min, max): number
  random(): number
  shuffle<T>(array): T[]
  pick<T>(array): T
  weightedPick<T>(items, weights): T
}
```

Uses Web Crypto API for cryptographically secure randomness.

#### 2. Game Engine (`lib/gameEngine.ts`)
```typescript
class SlotEngine {
  constructor(config: GameConfig)
  spin(bet: number): SpinResult
  private generateReel(): string[]
  private checkWins(symbols, bet): WinningLine[]
  private matchesRule(symbols, ruleSymbols): boolean
  getRTP(): number
}
```

#### 3. Game Configurations (`lib/gameConfigs.ts`)
- Symbol definitions with weights
- Paytable rules
- 4 pre-configured games
- Helper function to retrieve game by ID

### Game Flow

```
1. User selects bet amount
2. Client sends POST /api/play with gameId and bet
3. Server validates user balance
4. Server creates SlotEngine instance
5. Engine generates random reels using SecureRNG
6. Engine evaluates center line for wins
7. Server updates user balance
8. Server logs play history
9. Server returns result to client
10. Client animates reels and displays result
```

---

## Database Schema

### Tables

#### users
- Primary key: `id` (cuid)
- Unique: `email`
- Fields: `passwordHash`, `coins`, `lastDailyClaim`, `createdAt`, `updatedAt`
- Relations: `playHistory[]`

#### games
- Primary key: `id` (cuid)
- Unique: `name`, `slug`
- Fields: `description`, `thumbnail`, `reelCount`, `symbolsPerReel`, `symbols` (JSON), `paytable` (JSON), `minBet`, `maxBet`
- Relations: `playHistory[]`

#### play_history
- Primary key: `id` (cuid)
- Foreign keys: `userId`, `gameId`
- Fields: `bet`, `win`, `result` (JSON), `createdAt`
- Relations: `user`, `game`

---

## Authentication Flow

### Registration
```
1. User submits email + password
2. Server validates input
3. Server checks if email exists
4. Server hashes password (bcrypt, 10 rounds)
5. Server creates user with initial coins
6. Server generates JWT token
7. Server sets HTTP-only cookie
8. Client updates auth store
9. Client redirects to /games
```

### Login
```
1. User submits credentials
2. Server finds user by email
3. Server compares password hash
4. Server generates JWT token
5. Server sets HTTP-only cookie
6. Client updates auth store
7. Client redirects to /games
```

### Session Management
- JWT stored in HTTP-only cookie (XSS protection)
- 7-day expiration
- Middleware checks token on protected routes
- Auto-logout on token expiration

---

## Security Measures

### Authentication
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens in HTTP-only cookies
- ✅ Token expiration (7 days)
- ✅ Server-side validation on all routes

### Game Integrity
- ✅ Bet validation server-side
- ✅ Balance checks before spin
- ✅ Immutable game configurations
- ✅ Play history logging
- ✅ Crypto-secure RNG

### Data Protection
- ✅ No sensitive data in localStorage
- ✅ Input sanitization
- ✅ CORS protection
- ✅ SQL injection prevention (Prisma)

---

## Animation System

### Framer Motion Animations

#### Page Transitions
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

#### Button Interactions
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

#### Reel Spins
```typescript
animate={{ y: [0, -300, 0] }}
transition={{
  duration: 0.8,
  delay: reelIndex * 0.1,
  ease: [0.34, 1.56, 0.64, 1]
}}
```

#### Win Animations
```typescript
// Glow effect on winning symbols
className="animate-glow"

// Keyframe defined in Tailwind
@keyframes glow {
  0%, 100%: boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
  50%: boxShadow: '0 0 40px rgba(251, 191, 36, 0.8)'
}
```

---

## Responsive Design

### Breakpoints (Tailwind)
- **sm**: 640px (phones)
- **md**: 768px (tablets)
- **lg**: 1024px (laptops)
- **xl**: 1280px (desktops)

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly buttons (min 44px)
- Responsive grid layouts
- Collapsible navigation

---

## Performance Optimizations

### Frontend
- Next.js automatic code splitting
- Image optimization (next/image)
- Lazy loading of modals
- Efficient state updates (Zustand)
- CSS-in-JS optimization (Tailwind)

### Backend
- Prisma query optimization
- Database indexing (email, slug)
- Minimal API payload sizes
- HTTP-only cookies (no localStorage reads)

### Database
- SQLite for fast local development
- Can scale to PostgreSQL for production
- Indexed unique fields
- Efficient relations

---

## Deployment Considerations

### Production Checklist
- [ ] Change JWT_SECRET to strong random value
- [ ] Use PostgreSQL or MySQL instead of SQLite
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Set up error logging (Sentry)
- [ ] Configure CDN for static assets
- [ ] Enable gzip compression
- [ ] Add analytics (optional)

### Recommended Stack
- **Hosting**: Vercel (optimized for Next.js)
- **Database**: Railway PostgreSQL or PlanetScale
- **CDN**: Cloudflare or Vercel Edge
- **Monitoring**: Vercel Analytics or Sentry

---

## Extensibility

### Adding New Games
1. Define symbols in `gameConfigs.ts`
2. Create paytable rules
3. Add to `GAMES` array
4. Seed database with `npm run db:seed`

### Adding New Features
- **Sound Effects**: Add audio files and play on events
- **Leaderboards**: Create new table, add ranking logic
- **Achievements**: Track milestones, award badges
- **Social Features**: Add friends system, chat
- **Multi-line Wins**: Extend `checkWins()` logic

### Theming
- Colors: Edit `tailwind.config.ts`
- Fonts: Update `layout.tsx`
- Logos: Replace emoji with SVG
- Animations: Customize Framer Motion variants

---

## Testing Strategy

### Manual Testing
- User registration and login
- Game playability (all 4 games)
- Wallet operations
- Mobile responsiveness
- Cross-browser compatibility

### Automated Testing (Future)
- Unit tests for game engine
- API route tests
- Component tests (React Testing Library)
- E2E tests (Playwright)

---

## Maintenance

### Database Migrations
```bash
# Create migration
npx prisma migrate dev --name description

# Apply migration
npx prisma migrate deploy
```

### Monitoring
- Check error logs regularly
- Monitor database size
- Track API response times
- Review user feedback

---

## License & Disclaimer

**MIT License** - Free to use and modify

**Important**: This is a free-play entertainment application. No real money gambling. All virtual currency has no real-world value.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
