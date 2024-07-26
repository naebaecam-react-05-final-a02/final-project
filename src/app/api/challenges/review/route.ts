import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const { content, title } = await request.json();
    const {data: { user }} = await supabase.auth.getUser()
    if (!content || !title) {
      return NextResponse.json({ message: '모든 필드를 채워주세요' }, { status: 400 });
    }
    console.log('@@ user', user)
    const userId = user?.id;
    console.log('@@ userId', userId)
    if(!userId){
      return;
    }
    const { data, error } = await supabase.from('challengeReviews').insert({ content,  title, userId:userId, rating:1, challengeId:15}).select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: '후기가 성공적으로 등록되었습니다.', data }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json({ message: '후기 등록에 실패했습니다.', error: error.message }, { status: 500 });
  }
}
