import { AUTH_ENDPOINTS } from '@/api/auth.endpoints';
import { redirect } from 'next/navigation';

export default async function Home() {
  const res = await fetch(AUTH_ENDPOINTS.ME, {
    credentials: 'include',
    cache: 'no-store',
  });

  if (res.ok) {
    return redirect('/dashboard');
  }

  return redirect('/login');
}