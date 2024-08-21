import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // console.log('call route handler');
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) {
    return NextResponse.json(JSON.stringify({ error: authError.message }), { status: 401 });
  }
  // console.log(authError);

  const formData = await request.formData();
  const weight = formData.get('weight') as string;
  const date = formData.get('date') as string;
  const { error: postError } = await supabase.from('weights').insert({
    weight,
    date,
    userId: user?.id,
  });
  // console.log('postError', postError);
  if (postError)
    return NextResponse.json({
      error: postError.message,
    });
  return NextResponse.json(null, { status: 200 });
}
