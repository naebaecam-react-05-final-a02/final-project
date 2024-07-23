import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const ChallengeData = await req.json();
    const { data, error } = await supabase.from('challenges').insert(ChallengeData);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed To Insert Challenge', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Challenge Registered Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected register error:', error);
    return NextResponse.json({ error: 'Challenge Register Failed' }, { status: 500 });
  }
}
