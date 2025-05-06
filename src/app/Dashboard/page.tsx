'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

//Iconos
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";


interface Imagen {
  name: string;
  url: string;
}

export default function Dashboard() {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const Agregar = () => {
    inputRef.current?.click(); // abre el explorador de archivos
  };

  const Input = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append('file', archivo);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    alert('Imagen subida');
    setUpdateTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const cargarImagenes = async () => {
      const { data, error } = await supabase.storage.from('imagenes').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (error) {
        console.error('Error al listar imágenes:', error.message);
        return;
      }

      const urls = data?.map((file) => ({
        name: file.name,
        url: supabase.storage.from('imagenes').getPublicUrl(file.name).data.publicUrl,
      }));

      setImagenes(urls || []);
    };

    cargarImagenes();
  }, [updateTrigger]);

  const eliminarImagen = async (fileName: string) => {
    const res = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify({ fileName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();
    if (result.success) {
      alert('Imagen Elimianda');
      setUpdateTrigger((prev) => prev + 1);
    } else {
      console.error('Error al eliminar:', result.error);
    }
  };
  return (
    <div className='flex flex-col p-2 gap-4 bg-white h-[100vh]'>
      <div className='flex justify-between items-center px-3 bg-[#1e1e1e] rounded p-2'>
        <div className='relative w-[30px] h-[30px]'>
          <Link href={"/"}>
            <Image src={"/logo.png"} alt='logo' fill />
          </Link>

        </div>

        <IoMdAdd onClick={Agregar} className='text-white text-4xl cursor-pointer hover:text-slate-400 transition-all' />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={Input}
          style={{ display: 'none' }}
        />
      </div>
      <div className="flex flex-wrap gap-5 w-full">
        {imagenes.map((img, index) => (
          <div key={index} className="relative flex w-[300px] h-[400px] overflow-hidden rounded-md p-3">
            <Image src={img.url} alt={`Imagen ${index}`} fill />
            <div className='flex z-0 items-end'>
              <FaTrash onClick={() => eliminarImagen(img.name)} className="text-xl text-black hover:text-slate-600 cursor-pointer transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
