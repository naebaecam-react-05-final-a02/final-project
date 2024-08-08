import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type ContextType = {
  params: {
    storageId: string;
  };
};

type TestType = {
  size: number;
  type: string;
  name: string;
  lastmodified: number;
};

export async function POST(req: NextRequest, { params }: ContextType) {
  const supabase = createClient();
  const storage = params.storageId;

  try {
    const formData = await req.formData();
    // const file = formData.get('file') as File;
    const files: (FormDataEntryValue | null)[] = [];
    // const fileLength = Array.from(formData.keys()).length;

    Array.from(formData).forEach((_, i) => {
      files.push(formData.get(`file[${i}]`));
    });

    if (!files) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const promises = files.map((file) => {
      if (file instanceof File) {
        const extension = file!.name.split('.').slice(-1);
        const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;

        return supabase.storage.from(storage).upload(`/${filename}`, file);
      }
    });

    // const extension = file.name.split('.').slice(-1);
    // const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;

    try {
      // const { data, error } = await supabase.storage.from(storage).upload(`/${filename}`, file);
      const results = await Promise.all(promises);

      // if (error) {
      //   console.error('File upload error:', error);
      //   return NextResponse.json({ error: 'Image Upload Failed', details: error.message }, { status: 500 });
      // }

      // const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.fullPath}`;
      const imageURLs = results.map((result) => {
        if (typeof result == 'undefined') {
          return NextResponse.json({ error: 'Image Upload Failed' }, { status: 500 });
        }
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${result.data?.fullPath}`;
      });

      return NextResponse.json({ message: 'Image Upload Successfully', imageURLs }, { status: 201 });
    } catch (error) {
      console.error('Unexpected upload error:', error);
      return NextResponse.json({ error: 'Image Upload Failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected form data error:', error);
    return NextResponse.json({ error: 'Get Request Form Data Failed' }, { status: 400 });
  }
}
