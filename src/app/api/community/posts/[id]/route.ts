import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { id } = params;

  const { data, error } = await supabase.from('community_posts').select('*').eq('id', id).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
