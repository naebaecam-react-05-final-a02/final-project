import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from('communityPosts').select(
    `*, user:userId (
    id,
    nickname,
    profileURL
  )`,
    { count: 'exact' },
  );

  // 카테고리 필터링 적용
  if (category && category !== '전체') {
    query = query.eq('category', category);
  }

  const { data, error, count } = await query.range(from, to).order('createdAt', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    data,
    page,
    limit,
    totalCount: count,
  });
}
