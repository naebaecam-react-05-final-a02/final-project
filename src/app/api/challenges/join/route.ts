import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const challengeId = searchParams.get('cid');

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) return NextResponse.json({ error: 'User not found', status: 401 });

    const { data, error } = await supabase.from('challengeParticipants').insert({
      challengeId,
      userId: user.id,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed To Insert Participants', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Challenge Application Success ', data }, { status: 200 });
  } catch (error) {}
}
