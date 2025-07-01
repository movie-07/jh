'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const MAX_ATTEMPTS = 10;

  useEffect(() => {
    const blockedUntil = localStorage.getItem('block-until');
    if (blockedUntil && new Date() < new Date(blockedUntil)) {
      setError('🚫 Too many attempts. Try again tomorrow.');
    }
  }, []);

  const handleLogin = () => {
    const wrongAttempts = Number(localStorage.getItem('wrong-attempts') || 0);
    const blockedUntil = localStorage.getItem('block-until');

    if (blockedUntil && new Date() < new Date(blockedUntil)) {
      setError('🚫 Too many attempts. Try again tomorrow.');
      return;
    }

    if (
      password === 'Jaishreekrishna@123' ||
      password === 'Jaishreeram@bm'
    ) {
      document.cookie = `admin-token=${password}; path=/`;
      localStorage.removeItem('wrong-attempts');
      localStorage.removeItem('block-until');
      router.push('/admin');
    } else {
      const newAttempts = wrongAttempts + 1;
      localStorage.setItem('wrong-attempts', newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        localStorage.setItem('block-until', tomorrow.toISOString());
        setError('🚫 Bokachoda Vull pasword dis na ban kory diby ..1 day.');
      } else {
        setError(`❌ Wrong password (${newAttempts}/${MAX_ATTEMPTS})`);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-20 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4 text-center">🔒 Admin Login</h1>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <Input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="mt-3 w-full" onClick={handleLogin}>Login</Button>
    </div>
  );
}
