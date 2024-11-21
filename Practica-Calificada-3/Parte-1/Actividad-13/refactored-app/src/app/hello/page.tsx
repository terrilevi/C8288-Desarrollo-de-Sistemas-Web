'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hello() {
  return (
    <div>
      <div>Hello World!</div>

      <div>
        Usa el ancla de HTML para un{' '}
        <a href="https://nostarch.com" target="_blank" rel="noopener noreferrer">
          enlace externo
        </a>{' '}
        y el componente Link para una{' '}
        <Link href="/components/weather">página interna</Link>.
      </div>

      <div>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </div>
    </div>
  );
}