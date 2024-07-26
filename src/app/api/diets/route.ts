import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    console.log(date);

    const supabase = createClient();
    // get user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // get by user and date
    const { data, error } = await supabase.from('diets').select('*').eq('userId', user.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: '다이어트 등록에 실패했습니다' }, { status: 400 });
  }
};

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
      if (uploadFileError) return NextResponse.json({ error: '이미지 등록 도중 실패했습니다' }, { status: 400 });
      images.push(paths.path);
    }

    // insert diets info
    const { error } = await supabase.from('diets').insert({ dietType, foodInfo, images, userId: user.id });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ message: '다이어트가 성공적으로 등록되었습니다' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: '다이어트 등록에 실패했습니다' }, { status: 400 });
  }
};
