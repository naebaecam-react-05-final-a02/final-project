import { createAdminClient } from '@/supabase/admin';
import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const supabase = createClient();

  const adminClient = createAdminClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await adminClient.auth.admin.deleteUser(user.id);

  if (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}
