import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface ChallengeVerifyData {
  challengeId: string;
  userId: string;
  videoUrl: string;
  status: string;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const ChallengeVerifyData: ChallengeVerifyData = await req.json();
    const { data, error } = await supabase.from('challengeVerify').insert(ChallengeVerifyData);
    // console.log(ChallengeVerifyData);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed To Insert Verify', details: error.message }, { status: 400 });
    }

    const { count: verificationsCount, error: verificationsCountError } = await supabase
      .from('challengeVerify')
      .select('*', { count: 'exact', head: true })
      .eq('challengeId', ChallengeVerifyData.challengeId);

    if (verificationsCountError) {
      console.error('Supabase count error:', verificationsCountError);
      return NextResponse.json(
        { error: 'Failed To Get Verify Count', details: verificationsCountError.message },
        { status: 400 },
      );
    }

    const { error: verificationsCountUpdateError } = await supabase
      .from('challenges')
      .update({ verifications: verificationsCount })
      .eq('id', Number(ChallengeVerifyData.challengeId));

    if (verificationsCountUpdateError) {
      console.error('Supabase update error:', verificationsCountUpdateError);
      return NextResponse.json(
        { error: 'Failed To Update Verify Count', details: verificationsCountUpdateError.message },
        { status: 400 },
      );
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

    const { count: verificationsCount, error: verificationsCountError } = await supabase
      .from('challengeVerify')
      .select('*', { count: 'exact', head: true })
      .eq('challengeId', challengeId);

    if (verificationsCountError) {
      console.error('Supabase count error:', verificationsCountError);
      return NextResponse.json(
        { error: 'Failed To Get Verify Count', details: verificationsCountError.message },
        { status: 400 },
      );
    }

    const { error: verificationsCountUpdateError } = await supabase
      .from('challenges')
      .update({ verifications: verificationsCount })
      .eq('id', Number(challengeId));

    if (verificationsCountUpdateError) {
      console.error('Supabase update error:', verificationsCountUpdateError);
      return NextResponse.json(
        { error: 'Failed To Update Verify Count', details: verificationsCountUpdateError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'Challenge Verify Delete Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected delete error:', error);
    return NextResponse.json({ error: 'Challenge Verify Delete Failed' }, { status: 500 });
  }
}

// 인증 목록 가져오기
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const supabase = createClient();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from('challengeVerify').select('*,users(*)').eq('challengeId', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Unexpected Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
