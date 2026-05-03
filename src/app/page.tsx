import { AUTH_ENDPOINTS } from '@/api/auth.endpoints';
import { redirect } from 'next/navigation';

export default async function Home() {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
    return redirect('/dashboard');
  }

  try {
    const res = await fetch(AUTH_ENDPOINTS.ME, {
      credentials: 'include',
      cache: 'no-store',
      method: 'POST'
    });

    if (res.ok) return redirect('/dashboard');
  } catch {
    // backend no disponible
  }

  return redirect('/login');
}