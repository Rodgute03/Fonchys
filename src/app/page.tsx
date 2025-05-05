'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from 'next/image';

//Iconos
import { FaUser } from "react-icons/fa";

export default function Home() {

  //Variables
  const [img, setImg] = useState<string[]>([]);
  const [key, setKey] = useState<number>(0);

  //Carpeta de Imagenes
  useEffect(() => {
    fetch('/api/imagenes')
      .then(res => res.json())
      .then(setImg);
  }, []);

  //Animacion
  useEffect(() => {
    const intervalo = setInterval(() => {
      setKey((prev) => (prev + 1) % img.length); // reinicia cuando llega al final
    }, 3000);
    return () => clearInterval(intervalo); // limpia el intervalo al desmontar
  }, [img.length]);

  return (
    <div className='overflow-scroll scrollbar-hide h-screen bg-[#1e1e1e] lg:flex lg:flex-col'>
      <div className="relative md:w-full lg:w-[800px] h-[100vh] lg:my-10 lg:mx-[auto] lg:rounded-[20px] overflow-hidden">
        {img.map((img, index) => (
          <Image
            key={index}
            src={`/uploads/${img}`}
            alt={`Imagen ${index}`}
            fill
            className={` transition-opacity duration-1000 ease-in-out ${
              index === key ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
