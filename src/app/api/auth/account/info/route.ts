export const dynamic = 'force-dynamic';

import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError && authError.message === 'Auth session missing!') {
      return new Response(null, { status: 204 });
    }

    if (authError) {
      console.error('Supabase auth error:', authError);
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 400 });
    }

    try {
      const { data, error: queryError } = await supabase.from('users').select('*').eq('id', userId).single();

      if (queryError) {
        console.error('Supabase query error:', queryError);
        return NextResponse.json({ error: queryError.message }, { status: 404 });
      }

      const combinedUserData = {
        ...data,
        user_metadata: user?.user_metadata,
      };

      return NextResponse.json(combinedUserData);
    } catch (queryError) {
      console.error('Unexpected query error:', queryError);
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
