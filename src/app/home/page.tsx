'use client';

import { useEffect } from 'react';
import Home from '../components/home';

export default function Page() {
  useEffect(() => {
    const cookies = document.cookie;

    if (!cookies.includes('logado=true')) {
      alert('Favor, não tente burlar o sistema');
      window.location.href = '/login';
    }
  }, []);

  return <Home />;
}
