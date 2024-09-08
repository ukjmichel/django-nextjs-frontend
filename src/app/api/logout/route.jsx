import { deleteToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  deleteToken();
  return NextResponse.json({ loggedIn: false }, { status: 200 });
}
