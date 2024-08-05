import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type ContextType = {
  params: {
    exerciseId: string;
  };
};

export async function PATCH(req: NextRequest, { params }: ContextType) {
  const supabase = createClient();
  const { exerciseId } = params;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { isCompleted } = await req.json();

    const { data, error } = await supabase
      .from('exercises')
      .update({ isCompleted })
      .match({ id: exerciseId, userId: user?.id });

    if (error) {
      console.error('Supabase update error', error);
      return NextResponse.json({ error: 'Failed to update isCompleted', details: error.message });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected register error:', error);
    return NextResponse.json({ error: 'Challenge Register Failed' }, { status: 500 });
  }
}
