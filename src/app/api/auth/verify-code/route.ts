import { createAdminClient } from '@/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

const MAX_ATTEMPTS = 3;

export async function POST(request: NextRequest) {
  const { email, code } = await request.json();

  const supabase = createAdminClient();

  // 기존 인증 정보 조회
  const { data, error } = await supabase.from('emailVerification').select('*').eq('email', email).single();

  if (error) {
    return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
  }

  // 시도 횟수 증가
  const attempts = (data.attempts || 0) + 1;

  if (attempts > MAX_ATTEMPTS && data.code !== code) {
    // 최대 시도 횟수 초과 또는 코드 불일치
    await supabase.from('emailVerification').delete().eq('email', email);
    return NextResponse.json({ error: 'Invalid verification code or max attempts exceeded' }, { status: 400 });
  }

  if (data.code === code) {
    // 인증 성공
    await supabase.from('emailVerification').delete().eq('email', email);
    return NextResponse.json({ message: 'Code verified successfully' }, { status: 200 });
  } else {
    // 인증 실패, 시도 횟수 업데이트
    await supabase.from('emailVerification').update({ attempts }).eq('email', email);
    return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
  }
}
