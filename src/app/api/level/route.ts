import { createClient } from '@/supabase/server';
import { LevelType } from '@/types/level';
import { Tables } from '@/types/supabase';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest) => {
  const client = createClient();
  try {
    /**
     * uid: 대상 userId, 없으면 나
     * exp: 얻은 경험치
     */
    let { uid, exp } = await req.json();

    if (!uid) {
      const {
        data: { user },
        error,
      } = await client.auth.getUser();

      if (error) {
        console.error('Supabase auth error:', error);
        return NextResponse.json({ error: 'Failed to retrieve user', details: error.message }, { status: 500 });
      }

      if (!user) {
        console.error('User not found');
        return NextResponse.json({ error: 'User not found' }, { status: 401 });
      }

      uid = user.id;
    }

    // 경험치 테이블
    const { data: experiencesTable, error: experiencesTableError } = await client
      .from('level')
      .select('*')
      .returns<Tables<'level'>[]>();
    // 대상 경험치 가져오기
    //LEVEL 유저테이블에 경험치 들어가면 변경할 곳
    const { data: userExperience, error: userExperienceError } = await client
      .from('users')
      .select('level,experience')
      .eq('id', uid)
      .single<LevelType>();

    if (experiencesTableError) {
      console.error('Supabase select experiencesTable error:', experiencesTableError);
      return NextResponse.json(
        { error: 'Failed To get experiencesTable', details: experiencesTableError.message },
        { status: 400 },
      );
    }

    if (userExperienceError) {
      console.error('Supabase select userExperience error:', userExperienceError);
      return NextResponse.json(
        { error: 'Failed To get userExperience', details: userExperienceError.message },
        { status: 400 },
      );
    }

    let { experience: curExp } = userExperience;
    let { level: curLevel } = userExperience;
    let newExp = curExp + exp;
    let requiredExp = experiencesTable[curLevel - 1].experience;

    while (newExp >= requiredExp) {
      newExp -= requiredExp;
      curLevel += 1;
      requiredExp = experiencesTable[curLevel - 1].experience;
    }

    //LEVEL 유저테이블에 경험치 들어가면 변경할 곳
    const { data, error } = await client.from('users').update({ level: curLevel, experience: newExp }).eq('id', uid);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed To Update Level', details: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Level Update Successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected level update error:', error);
    return NextResponse.json({ error: 'Level Update Failed' }, { status: 500 });
  }
};
