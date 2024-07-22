import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const dietType = formData.get('dietType');
    const foodInfo = JSON.parse(formData.get('foodInfo') as string);
    const imageFiles = formData.getAll('imageFiles') as File[];

    const supabase = createClient();
    // get user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // save images in storage
    const images: string[] = [];
    for (const file of imageFiles) {
      const fileName = `diet_${crypto.randomUUID()}.${file.name.split('.').pop()}`;
      const { data: paths, error: uploadFileError } = await supabase.storage.from('dietImages').upload(fileName, file);
      if (uploadFileError) return NextResponse.json({ error: 'Image upload Failed' }, { status: 400 });
      images.push(paths.path);
    }

    // insert diets info
    const { error } = await supabase.from('diets').insert({ dietType, foodInfo, images, userId: user.id });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ message: 'Diet uploaded successfully' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: 'Diet upload failed' }, { status: 400 });
  }
};
