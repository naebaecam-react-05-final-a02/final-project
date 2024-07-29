import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const challengeId = searchParams.get('cid');
  const verificationId = searchParams.get('vid');
  const supabase = createClient();
  try {
    const ChallengeVerifyData = await req.json();
    const { data, error } = await supabase
      .from('challengeVerify')
      .update(ChallengeVerifyData)
      .match({ challengeId, id: verificationId });
    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed To Insert Verify', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Challenge Verify Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected register error:', error);
    return NextResponse.json({ error: 'Challenge Verify Failed' }, { status: 500 });
  }
}
