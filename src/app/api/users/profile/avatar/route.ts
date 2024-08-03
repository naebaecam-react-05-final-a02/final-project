import { createClient } from '@/supabase/server';

export async function DELETE() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { data: storageResult, error: storageError } = await supabase.storage.from('profile-images').remove([user.id]);
  if (storageError) {
    return new Response(JSON.stringify({ error: storageError.message }), { status: 500 });
  }
  const { data: DBResult, error: DBError } = await supabase
    .from('users')
    .update({ profileURL: null })
    .eq('id', user.id);
  if (DBError) {
    return new Response(JSON.stringify({ error: DBError.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
}
