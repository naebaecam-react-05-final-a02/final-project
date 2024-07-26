import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get('image') as File;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  if (image) {
    const newImagePath = `${user?.id}/${uuidv4()}`;
    const { data: imageUploadResult, error: imageUploadError } = await supabase.storage
      .from('profile-images')
      .upload(newImagePath, image);
    if (imageUploadError) {
      return new Response(JSON.stringify({ error: imageUploadError.message }), { status: 500 });
    }
    const publicUrl = supabase.storage.from('profile-images').getPublicUrl(imageUploadResult.path).data.publicUrl;
    const { error: updateError } = await supabase
      .from('users')
      .update({
        profileURL: publicUrl,
        nickname: title,
        height: startDate,
        weight: endDate,
      })
      .eq('id', user?.id);
    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }
  } else {
    const { error: updateError } = await supabase
      .from('users')
      .update({
        nickname: title,
        height: startDate,
        weight: endDate,
      })
      .eq('id', user?.id);
    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }
  }
  return new Response(null, { status: 200 });
}
