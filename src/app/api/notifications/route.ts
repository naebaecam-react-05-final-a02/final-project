import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const nid = searchParams.get('nid');

  try {
    const { data, error } = await supabase.from('notifications').update({ isRead: true }).eq('id', nid);

    if (error) {
      console.error('Supabase notifications update error:', error);
      return NextResponse.json({ error: 'Failed to Update Notifications', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Notifications Update Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected update error:', error);
    return NextResponse.json({ error: 'Notifications Update Failed' }, { status: 500 });
  }
}
