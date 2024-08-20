import { dietTypeCode } from '@/data/dietTypeCode';
import { createClient } from '@/supabase/server';
import { getNextDateISO } from '@/utils/dateFormatter';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') as string;

    const supabase = createClient();
    // get user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
      .from('diets')
      .select('*')
      .eq('userId', user.id)
      .gte('date', date)
      .lt('date', getNextDateISO(date))
      .order('dietType');

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: '식단 조회에 실패했습니다' }, { status: 400 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { date, dietType, foods } = await request.json();

    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error: selectError } = await supabase
      .from('diets')
      .select('id')
      .eq('userId', user.id)
      .eq('date', date)
      .eq('dietType', dietTypeCode[dietType]);

    if (selectError) return NextResponse.json({ error: selectError.message }, { status: 400 });

    if (data.length > 0)
      return NextResponse.json(
        {
          error: `해당 날짜의 식단이 이미 기록되어 있습니다.\n다른 시간대를 선택해주세요`,
        },
        { status: 409 },
      );

    const { error: insertError } = await supabase
      .from('diets')
      .insert({ date, dietType: dietTypeCode[dietType], foods, userId: user.id });

    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 });

    return NextResponse.json({ message: '식단이 성공적으로 등록되었습니다' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: '식단 등록에 실패했습니다' }, { status: 400 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const { id, date, dietType, foods } = await request.json();

    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error: selectError } = await supabase
      .from('diets')
      .select('id')
      .neq('id', id)
      .eq('userId', user.id)
      .eq('date', date)
      .eq('dietType', dietTypeCode[dietType]);

    if (selectError) return NextResponse.json({ error: selectError.message }, { status: 400 });
    if (data.length > 0)
      return NextResponse.json(
        {
          error: `해당 날짜의 식단이 이미 기록되어 있습니다.\n다른 시간대를 선택해주세요`,
        },
        { status: 409 },
      );

    const { error: updateError } = await supabase
      .from('diets')
      .update({ date, dietType: dietTypeCode[dietType], foods })
      .eq('id', id);

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 400 });

    return NextResponse.json({ message: '식단이 성공적으로 수정되었습니다' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: '식단 수정에 실패했습니다' }, { status: 400 });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') as string;

    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await supabase.from('diets').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ message: '식단이 성공적으로 삭제되었습니다' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: '식단 삭제에 실패했습니다' }, { status: 400 });
  }
};
