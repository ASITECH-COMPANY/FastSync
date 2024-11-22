import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Header: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) return null;

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={user.name} className="w-10 h-10 rounded-full" />
          ) : (
            <User className="w-10 h-10 p-2 bg-gray-100 rounded-full" />
          )}
          <div>
            <h2 className="font-semibold text-gray-900">Bienvenue, {user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </header>
  );
};