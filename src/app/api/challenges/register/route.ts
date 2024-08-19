import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const challengeData = await req.json();
    const { data, error } = await supabase.from('challenges').insert(challengeData).select('id');

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

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const challengeId = searchParams.get('cid');

  try {
    const { data, error } = await supabase.from('challenges').delete().eq('id', challengeId);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: 'Failed To Delete Challenge', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Challenge Delete Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected delete error:', error);
    return NextResponse.json({ error: 'Challenge Delete Failed' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const challengeId = searchParams.get('cid');

  try {
    const challengeData = await req.json();
    const { data, error } = await supabase.from('challenges').update(challengeData).eq('id', challengeId);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed to Update Challenge', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Challenge Update Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected update error:', error);
    return NextResponse.json({ error: 'Challenge Update Failed' }, { status: 500 });
  }
}
