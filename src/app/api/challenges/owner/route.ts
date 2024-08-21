import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) return NextResponse.json(JSON.stringify({ error: authError.message }), { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));

  const from = (page - 1) * limit;
  const to = page * limit;

  const { data, error: fetchError } = await supabase
    .from('challenges')
    .select('*,user:users!inner(*,id)')
    .eq('users.id', user?.id)
    .range(from, to);

  // console.log(data);

  if (!data || data.length < 1) {
    return NextResponse.json({
      error: `${page} Page does not exist`,
      data: null,
      nextPage: null,
    });
  }

  if (data.length > limit) {
    const response = data.slice(0, limit);
    const nextPage = page + 1;
    return NextResponse.json({ error: null, data: response, nextPage });
  } else {
    const nextPage = null;
    return NextResponse.json({ error: null, data, nextPage });
  }
}
