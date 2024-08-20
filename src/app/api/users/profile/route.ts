import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const formData = await request.formData();
  const avatar = formData.get('avatar') as File;
  const nickname = formData.get('nickname') as string;
  const height = formData.get('height') as string;
  const weight = formData.get('weight') as string;
  const introduction = formData.get('introduction') as string;
  if (avatar) {
    const newImagePath = `${user?.id}/${uuidv4()}`;
    const { data: imageUploadResult, error: imageUploadError } = await supabase.storage
      .from('profile-images')
      .upload(newImagePath, avatar);
    if (imageUploadError) {
      return new Response(JSON.stringify({ error: imageUploadError.message }), { status: 500 });
    }
    const publicUrl = supabase.storage.from('profile-images').getPublicUrl(imageUploadResult.path).data.publicUrl;
    const { error: updateError } = await supabase
      .from('users')
      .update({
        profileURL: publicUrl,
        nickname,
        height,
        weight,
        introduction,
      })
      .eq('id', user?.id);
    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }
  } else {
    const { error: updateError } = await supabase
      .from('users')
      .update({
        nickname,
        height,
        weight,
        introduction,
      })
      .eq('id', user?.id);
    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }
  }
  return new Response(null, { status: 200 });
}
