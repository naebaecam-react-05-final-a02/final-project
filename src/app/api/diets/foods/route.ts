import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const foodName = searchParams.get('foodName') as string;

    const response = await axios.get(
      `https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?ServiceKey=${process.env.NUTRITION_INFO_SERVICE_KEY}&type=json&desc_kor=${foodName}`,
    );

    return NextResponse.json(response.data.body.items);
  } catch (e) {
    return NextResponse.json({ message: '식단 조회에 실패했습니다' }, { status: 400 });
  }
};
