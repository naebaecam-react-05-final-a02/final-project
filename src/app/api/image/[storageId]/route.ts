import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type ContextType = {
  params: {
    storageId: string;
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, { params }: ContextType) {
  const supabase = createClient();
  const storage = params.storageId;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const extension = file.name.split('.').slice(-1);
    const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;

    try {
      const { data, error } = await supabase.storage.from(storage).upload(`/${filename}`, file);

      if (error) {
        console.error('File upload error:', error);
        return NextResponse.json({ error: 'Image Upload Failed', details: error.message }, { status: 500 });
      }

      const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.fullPath}`;

      return NextResponse.json({ message: 'Image Upload Successfully', imageURL }, { status: 201 });
    } catch (error) {
      console.error('Unexpected upload error:', error);
      return NextResponse.json({ error: 'Image Upload Failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected form data error:', error);
    return NextResponse.json({ error: 'Get Request Form Data Failed' }, { status: 400 });
  }
}
