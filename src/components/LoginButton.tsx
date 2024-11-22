import React from 'react';
import { LogIn } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';

export const LoginButton: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setAccessToken(response.access_token);
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${response.access_token}` },
      }).then((res) => res.json());

      setUser({
        name: userInfo.name,
        email: userInfo.email,
        imageUrl: userInfo.picture,
      });
    },
    scope: 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
    >
      <LogIn className="w-5 h-5" />
      Se connecter avec Google
    </button>
  );
};