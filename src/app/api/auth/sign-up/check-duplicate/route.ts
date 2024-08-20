export const dynamic = 'force-dynamic';

import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { field, value } = await request.json();

  if (field !== 'email' && field !== 'nickname') {
    return NextResponse.json({ error: 'Invalid field' }, { status: 400 });
  }

  try {
    const supabase = createClient();
    const { data, error: queryError } = await supabase.from('users').select('*').eq(field, value).single();

    if (queryError) {
      if (queryError.code === 'PGRST116') {
        return NextResponse.json({ available: true });
      }
      console.error('Supabase query error:', queryError);
      return NextResponse.json({ error: queryError.message }, { status: 500 });
    }

    return NextResponse.json({ available: false });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
