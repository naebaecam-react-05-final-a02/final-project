import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { newPassword, token } = await request.json();

  const supabase = createClient();

  try {
    // 토큰을 사용하여 비밀번호를 직접 업데이트합니다.
    const { error } = await supabase.auth.updateUser(
      {
        password: newPassword,
      },
      {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
      },
    );

    if (error) {
      console.error('Password update error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.' }, { status: 500 });
  }
}
