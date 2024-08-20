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

    const { count: participantsCount, error: participantsCountError } = await supabase
      .from('challengeParticipants')
      .select('*', { count: 'exact', head: true })
      .eq('challengeId', challengeId);

    if (participantsCountError) {
      console.error('Supabase count error:', participantsCountError);
      return NextResponse.json(
        { error: 'Failed To Get Participants Count', details: participantsCountError.message },
        { status: 400 },
      );
    }

    const { error: participantsCountUpdateError } = await supabase
      .from('challenges')
      .update({ participants: participantsCount })
      .eq('id', Number(challengeId));

    if (participantsCountUpdateError) {
      console.error('Supabase update error:', participantsCountUpdateError);
      return NextResponse.json(
        { error: 'Failed To Update Verify Count', details: participantsCountUpdateError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'Challenge Application Success ', data }, { status: 200 });
  } catch (error) {
    console.error('Unexpected insert error:', error);
    return NextResponse.json({ error: 'Unexpected Insert Failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const challengeId = searchParams.get('cid');

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) return NextResponse.json({ error: 'User not found', status: 401 });

    const { data, error } = await supabase
      .from('challengeParticipants')
      .delete()
      .match({ challengeId: challengeId, userId: user?.id });

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: 'Failed To Leave Challenge', details: error.message }, { status: 400 });
    }

    const { count: participantsCount, error: participantsCountError } = await supabase
      .from('challengeParticipants')
      .select('*', { count: 'exact', head: true })
      .eq('challengeId', challengeId);

    if (participantsCountError) {
      console.error('Supabase count error:', participantsCountError);
      return NextResponse.json(
        { error: 'Failed To Get Participants Count', details: participantsCountError.message },
        { status: 400 },
      );
    }

    const { error: participantsCountUpdateError } = await supabase
      .from('challenges')
      .update({ participants: participantsCount })
      .eq('id', Number(challengeId));

    if (participantsCountUpdateError) {
      console.error('Supabase update error:', participantsCountUpdateError);
      return NextResponse.json(
        { error: 'Failed To Update Verify Count', details: participantsCountUpdateError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'Challenge Leave Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected delete error:', error);
    return NextResponse.json({ error: 'Unexpected delete Failed' }, { status: 500 });
  }
}
