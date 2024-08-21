import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const foodName = searchParams.get('foodName') as string;

    const supabase = createClient();
    const { data, error } = await supabase.from('foods').select().ilike('name', `%${foodName}%`);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    if (!data) return NextResponse.json([]);

    return NextResponse.json(data);
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ message: '식단 조회에 실패했습니다' }, { status: 400 });
  }
};
