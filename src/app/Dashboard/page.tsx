'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

//Iconos
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";


export default function Dashboard() {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const Agregar = () => {
    inputRef.current?.click(); // abre el explorador de archivos
  };

  const Input = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append('imagen', archivo);

    await fetch('/api/imagenes', {
      method: 'POST',
      body: formData,
    });

    alert('Imagen subida');
    setUpdateTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetch('/api/imagenes')
      .then(res => res.json())
      .then(setImagenes);
  },[updateTrigger]);

  const Eliminar = async (nombre: string) => {
    await fetch(`/api/imagenes/delete?nombre=${nombre}`, { method: 'DELETE' });
    setImagenes(prev => prev.filter(img => img !== nombre));
    alert('Imagen Eliminada');
  };
  return (
    <div className='flex flex-col p-2 gap-4 bg-white h-[100vh]'>
      <div className='flex justify-between items-center px-3 bg-[#1e1e1e] rounded p-2'>
        <div className='relative w-[30px] h-[30px]'>
        <Image src={"/logo.png"} alt='logo' fill/>
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
                <Image src={"/uploads/"+img} alt={`Imagen ${index}`} fill/>
                <div className='flex z-0 items-end'>
                    <FaTrash onClick={() => Eliminar(img)} className="text-xl text-black hover:text-slate-600 cursor-pointer transition-all"/>
                </div>
            </div>
    ))}
      </div>
    </div>
  );
}
