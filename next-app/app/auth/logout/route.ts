import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SupabaseAuthService } from '@/lib/supabaseAuthService';

export async function POST() {
  const cookieStore = await cookies();  // ← await を追加
  const accessToken = cookieStore.get('sb-access-token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  await SupabaseAuthService.logout(accessToken);

  const res = NextResponse.json({ success: true });

  // Cookie 削除
  res.cookies.set('sb-access-token', '', {
    path: '/',
    maxAge: 0,
  });

  return res;
}