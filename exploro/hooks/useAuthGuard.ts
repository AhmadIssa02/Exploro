import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTokenCookie } from '@/utils/cookieUtils';

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getTokenCookie();
    if (!token) {
      router.push('/auth/login');
    }
  }, []);

  return;
};
