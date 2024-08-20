import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const formData = await request.formData();
    const content = formData.get('content') as string;
    const title = formData.get('title') as string;
    const challengeId = formData.get('challengeId') as string;
    const rating = Number(formData.get('rating')); // 별점 추가
    const files = formData.getAll('reviewImages') as File[];

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    if (!content || !title || files.length === 0) {
      return NextResponse.json({ message: '모든 필드를 채워주세요' }, { status: 400 });
    }

    const userId = user.id;

    if (!userId) {
      return;
    }

    // 이미지 파일을 Supabase 스토리지에 업로드
    const imageUrls: string[] = [];
    for (const file of files) {
      const fileName = `review_${crypto.randomUUID()}.${file.name.split('.').pop()}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('challengeReviewImages')
        .upload(fileName, file);
      if (storageError) {
        throw storageError;
      }
      imageUrls.push(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/challengeReviewImages/${fileName}`,
      );
    }

    // 리뷰 정보와 이미지 URL을 데이터베이스에 저장
    const { data, error } = await supabase
      .from('challengeReviews')
      .upsert(
        {
          content,
          title,
          userId,
          rating,
          challengeId,
          reviewImages: imageUrls,
        },
        { onConflict: 'challengeId', ignoreDuplicates: false },
      )
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: '후기가 성공적으로 등록되었습니다.', data }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '후기 등록에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}

// 후기 받아오기
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const supabase = createClient();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from('challengeReviews').select('*').eq('challengeId', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
