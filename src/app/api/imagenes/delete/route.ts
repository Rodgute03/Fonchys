import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nombre = searchParams.get('nombre');

  if (!nombre) return NextResponse.json({ error: 'Falta nombre' }, { status: 400 });

  const ruta = path.join(process.cwd(), 'public', 'uploads', nombre);

  if (!fs.existsSync(ruta)) return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });

  fs.unlinkSync(ruta);
  return NextResponse.json({ mensaje: 'Archivo eliminado' });
}