import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTokenCookie } from '@/utils/cookieUtils';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Router from 'next/router';

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getTokenCookie();
    if (!token) {
      const errorAlert = document.createElement('div');
          errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
          errorAlert.textContent = 'Unauthorized access! Please login to your account.';
          document.body.appendChild(errorAlert);
          setTimeout(() => {
              errorAlert.remove();
          }, 5000);
          router.push('/auth/login');
    }
  }, []);

  useEffect(() => {
    async function verifyToken() {
      const token = getTokenCookie();
      if (!token) {
        return;
      }
      try {
        const decoded = jwt.decode(token) as { id: string };
        const userId = decoded.id;
        const user = await axios.get(`http://localhost:3000/users/${userId}`);
        if (user.data.verifyEmailToken !== null) {
          const errorAlert = document.createElement('div');
          errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
          errorAlert.textContent = 'Unauthorized access! Please verify your account.';
          document.body.appendChild(errorAlert);
          setTimeout(() => {
              errorAlert.remove();
          }, 5000);
          router.push('/auth/login');
        }
      } catch (error: any) {
        console.error('Token verification failed:', error);
        router.push('/auth/login');
      }
    }
    verifyToken();
  }, []);

  return;
};
