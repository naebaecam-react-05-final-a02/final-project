import { createAdminClient } from '@/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const email = data.email as string;

  // 랜덤 6자리 숫자 생성
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const supabase = createAdminClient();

  // 기존 코드가 있다면 삭제
  await supabase.from('emailVerification').delete().eq('email', email);

  const { error } = await supabase.from('emailVerification').insert({ email, code: verificationCode });

  if (error) {
    console.log(1);
    return NextResponse.json({ error: 'Failed to save verification code' }, { status: 500 });
  }
  console.log(verificationCode);
  return NextResponse.json({ message: verificationCode });
}
