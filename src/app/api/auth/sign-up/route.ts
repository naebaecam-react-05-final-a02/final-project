import { createClient } from '@/supabase/server';
import { SignUpFields } from '@/types/auth';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const formData = await request.formData();
  const fields: (keyof SignUpFields)[] = ['email', 'nickname', 'password', 'height', 'weight', 'profileImage'];
  const formFields: Partial<SignUpFields> = {};

  for (const field of fields) {
    const value = formData.get(field);
    if (field === 'profileImage') {
      if (value instanceof File) {
        formFields[field] = value;
      }
    } else if (typeof value === 'string') {
      if (field === 'email' || field === 'nickname' || field === 'password') {
        if (value.trim() === '') {
          return NextResponse.json({ error: `${field}를 입력해주세요.` }, { status: 400 });
        }
        formFields[field] = value.trim();
      } else {
        // height와 weight는 선택 사항이므로 값이 있을 때만 추가
        if (value.trim() !== '') {
          formFields[field] = value.trim();
        }
      }
    }
  }

  // 필수 필드 확인
  if (!formFields.email || !formFields.nickname || !formFields.password) {
    return NextResponse.json({ error: '필수 정보가 누락되었습니다.' }, { status: 400 });
  }

  const { email, nickname, password, height, weight, profileImage } = formFields as SignUpFields;

  // 1. 사용자 가입
  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  if (signUpError) {
    console.error('Sign up error:', signUpError);
    return NextResponse.json({ error: signUpError.message }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ message: 'Sign up process initiated, but no data returned' }, { status: 200 });
  }

  // 2. 프로필 이미지 처리 (있다면)
  let profileImageUrl = null;
  if (profileImage && profileImage.name) {
    const fileExt = profileImage.name.split('.').pop();
    const fileName = `${user.id}/profile.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, profileImage);

    if (uploadError) {
      console.error('Image upload error:', uploadError);
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from('profile-images').getPublicUrl(fileName);

      profileImageUrl = publicUrl;
    }
  }

  // 3. 사용자 정보를 users 테이블에 삽입
  const { data: userData, error: insertError } = await supabase
    .from('users')
    .update({
      email: email,
      nickname: nickname,
      height: height || null,
      weight: weight || null,
      profileURL: profileImageUrl || null,
    })
    .eq('id', user.id)
    .select()
    .single();

  if (insertError) {
    console.error('User data insertion error:', insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(userData);
}
