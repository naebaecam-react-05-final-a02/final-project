import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const requestBody = await request.json();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const newData = { ...requestBody, weight: Number(requestBody.weight), height: Number(requestBody.height) };

  const { data, error } = await supabase.from('users').update(newData).eq('id', user.id);
  if (error) {
    return new Response(error.message, { status: 500 });
  }
  console.log(data, error);
  return new Response(null, { status: 200 });
}
