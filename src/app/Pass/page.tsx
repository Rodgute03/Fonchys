'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PASS = '10473754202'

export default function Pass() {

  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === PASS) {
      router.push('/Dashboard'); // ✅ redirige si la contraseña es correcta
    } else {
      setError('Contraseña incorrecta.'); // ❌ muestra mensaje de error
    }
  };
  return (
    <div className='relative w-full h-[100vh] flex justify-center items-center'>
      <Image className='z-[-1]' src={"/bg.jpg"} alt='fondo' fill />
      <div className='flex flex-col justify-center items-center backdrop-blur-sm   p-20 rounded-[20px] bg-[#11111110] gap-5'>
        <h1 className='text-4xl font-bold'>BIENVENIDO</h1>
        <div className='flex flex-col gap-1'>
        {error && <p className="mx-2 text-red-500 text-sm">{error}</p>}
          <input
            type="password"
            className="p-2 border rounded mb-2 outline-[0] w-[400px]"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit} className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-700 transition-all">
          Entrar
        </button>
      </div>
    </div>
  );
}
