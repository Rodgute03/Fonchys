import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

interface DeleteRequest {
  fileName: string;
}

export async function POST(req: Request) {
  try {
    const body: DeleteRequest = await req.json();
    const { fileName } = body;

    if (!fileName) {
      return NextResponse.json({ error: 'No fileName provided' }, { status: 400 });
    }

    const { error } = await supabase.storage
      .from('imagenes')
      .remove([fileName]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
