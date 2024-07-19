import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { newPassword, token, email } = await request.json();

  const supabase = createClient();

  try {
    // 세션 정보 가져오기
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Session retrieval error:', sessionError);
      return NextResponse.json({ error: sessionError.message }, { status: 400 });
    }

    if (!session) {
      // 세션이 없는 경우, 토큰을 사용하여 비밀번호 재설정
      if (!email) {
        return NextResponse.json({ error: '이메일 주소가 필요합니다.' }, { status: 400 });
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password?token=${token}`,
      });

      if (resetError) {
        console.error('Password reset error:', resetError);
        return NextResponse.json({ error: resetError.message }, { status: 400 });
      }

      return NextResponse.json({ message: '비밀번호 재설정 이메일이 전송되었습니다.' }, { status: 200 });
    } else {
      // 세션이 있는 경우, 직접 비밀번호 업데이트
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        console.error('Password update error:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.', user: data.user }, { status: 200 });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.' }, { status: 500 });
  }
}
