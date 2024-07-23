import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const optionalDate = params.get('query');

  const supabase = createClient();
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('Supabase auth error:', authError);
      return NextResponse.json({ error: 'Authentication error', detail: authError.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const userId = user.id;

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    try {
      const { data, error: error } = await supabase
        .from('weights')
        .select('*')
        .eq('userId', userId)
        .gte('date', optionalDate)
        .order('date');

      if (error) {
        console.error('Supabase query error:', error);
        return NextResponse.json({ error: 'Query error', detail: error.message }, { status: 500 });
      }

      return NextResponse.json(data);
    } catch (error) {
      const err = error as Error;
      console.error('Unexpected query error:', err);
      return NextResponse.json({ error: 'Failed to fetch data', detail: err.message }, { status: 500 });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error', detail: err.message }, { status: 500 });
  }
}
