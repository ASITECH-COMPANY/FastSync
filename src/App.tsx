import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthStore } from './store/authStore';
import { LoginButton } from './components/LoginButton';
import { Header } from './components/Header';
import { ContactsManager } from './components/ContactsManager';
import { Smartphone } from 'lucide-react';

const GOOGLE_CLIENT_ID = '229227546410-s4oeal4pmn9jg0nts0mpgdi8k7nq0mpk.apps.googleusercontent.com'; // Replace with your actual client ID

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 py-12">
          {!user ? (
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-blue-100 rounded-full">
                  <Smartphone className="w-12 h-12 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Google Contacts Manager</h1>
                <p className="text-xl text-gray-600">
                  Gérez et mettez à jour facilement vos contacts Google
                </p>
              </div>
              <LoginButton />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <ContactsManager />
            </div>
          )}
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;