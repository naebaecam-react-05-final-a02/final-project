import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const ChallengeVerifyData = await req.json();
    const { data, error } = await supabase.from('challengeVerify').insert(ChallengeVerifyData);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed To Insert Verify', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Challenge Verify Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected register error:', error);
    return NextResponse.json({ error: 'Challenge Verify Register Failed' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
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
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed To Update Verify', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Challenge Verify Update Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected update error:', error);
    return NextResponse.json({ error: 'Challenge Verify Update Failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const challengeId = searchParams.get('cid');
  const verificationId = searchParams.get('vid');
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('challengeVerify').delete().match({ challengeId, id: verificationId });

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: 'Failed To Delete Verify', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Challenge Verify Delete Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected delete error:', error);
    return NextResponse.json({ error: 'Challenge Verify Delete Failed' }, { status: 500 });
  }
}
