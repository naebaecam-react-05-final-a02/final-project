import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function PATCH() {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error('Supabase user not found:');
      return NextResponse.json({ error: 'Failed to Found User' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('notifications')
      .update({ isRead: true })
      .match({ targetUserId: user?.id, isRead: false });

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
