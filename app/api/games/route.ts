import { NextResponse } from 'next/server';
import { GAMES } from '@/lib/gameConfigs';

export async function GET() {
  return NextResponse.json({ games: GAMES });
}
