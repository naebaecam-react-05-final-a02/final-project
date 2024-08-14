import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type ContextType = {
  params: {
    nid: string;
  };
};

export async function PATCH(_: NextRequest, { params }: ContextType) {
  const supabase = createClient();
  const { nid } = params;

  try {
    const { data, error } = await supabase.from('notifications').update({ isRead: true }).eq('id', nid);

    if (error) {
      console.error('Supabase notification update error:', error);
      return NextResponse.json({ error: 'Failed to Update Notification', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Notification Update Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected update error:', error);
    return NextResponse.json({ error: 'Notification Update Failed' }, { status: 500 });
  }
}
