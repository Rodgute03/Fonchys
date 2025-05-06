'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

//Iconos
import { FaUser } from "react-icons/fa";


export default function Home() {

  //Variables
  const [urls, setUrls] = useState<string[]>([]);
  const [key, setKey] = useState<number>(0);

  //Carpeta de Imagenes

  useEffect(() => {
    const obtenerImagenes = async () => {
      const { data, error } = await supabase.storage.from('imagenes').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (error) {
        console.error('Error al listar imágenes:', error.message);
        return;
      }

      const urls = data?.map((file) =>
        supabase.storage.from('imagenes').getPublicUrl(file.name).data.publicUrl
      );

      setUrls(urls);
    };

    obtenerImagenes();
  }, []);

  //Animacion
  useEffect(() => {
    const intervalo = setInterval(() => {
      setKey((prev) => (prev + 1) % urls.length); // reinicia cuando llega al final
    }, 3000);
    return () => clearInterval(intervalo); // limpia el intervalo al desmontar
  }, [urls.length]);

  return (
    <div className='overflow-scroll scrollbar-hide h-screen bg-[#1e1e1e] lg:flex lg:flex-col'>
      <div className="relative md:w-full lg:w-[800px] h-[100vh] lg:my-10 lg:mx-[auto] lg:rounded-[20px] overflow-hidden">
        {urls.map((url, i) => (
          <Image
            key={i}
            src={url}
            alt={`Imagen ${i}`}
            fill
            className={` transition-opacity duration-1000 ease-in-out ${
              i === key ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>
      <footer className="w-full flex justify-end p-5">
        <Link href="/Pass">
          <FaUser className='text-2xl text-white hover:text-slate-400 transition-all'/>
        </Link>
      </footer>
    </div>
  );
}
