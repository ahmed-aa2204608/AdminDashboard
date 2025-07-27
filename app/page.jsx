"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem('authenticated');
    if (auth) {
      router.push('/statistics');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <div>Loading...</div>;
}