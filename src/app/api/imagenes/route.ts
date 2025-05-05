// app/api/imagenes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'; // para que no se cachee

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('imagen') as File;

  if (!file) return NextResponse.json({ error: 'No se subió archivo' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const nombre = `${Date.now()}-${file.name}`;
  const ruta = path.join(process.cwd(), 'public', 'uploads', nombre);

  fs.writeFileSync(ruta, buffer);

  return NextResponse.json({ nombre });
}

export async function GET() {
  const carpeta = path.join(process.cwd(), 'public', 'uploads');
  const archivos = fs.readdirSync(carpeta).filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
  return NextResponse.json(archivos);
}
