import { NextRequest } from 'next/server';

type ContextType = {
  params: {
    slug: string[];
  };
};

export async function POST(req: NextRequest, { params }: ContextType) {
  console.log(req);
  // const extension = file.name.split('.').slice(-1);
  // const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;
  // const res = await supabase.storage.from('challengeRegister').upload(`/${filename}`, file);

  // const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${res.data?.fullPath}`;
}
