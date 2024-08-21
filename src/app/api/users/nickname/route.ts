import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get('nickname');
  const { data, error } = await supabase.from('users').select(`*`).eq('nickname', nickname).single();
  // console.log(data, error);
  if (error) return NextResponse.json({ status: 200, isAvailable: true });
  return NextResponse.json({ status: 400, isAvailable: false });
}
