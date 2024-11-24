import React, { useState } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import type { Contact } from '../types';

export const ContactsManager: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  const updateContacts = async () => {
    setIsUpdating(true);
    setProgress(0);
    setIsComplete(false);
  
    try {
      const response = await fetch(
        'https://people.googleapis.com/v1/people/me/connections?personFields=phoneNumbers',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const data = await response.json();
      const contacts: Contact[] = data.connections || [];
      const totalContacts = contacts.length;
  
      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const phoneNumbers = contact.phoneNumbers || [];
        let updated = false;
  
        const updatedPhoneNumbers = phoneNumbers.map(phone => {
          const newNumber = processPhoneNumber(phone.value);
          if (phone.value !== newNumber) {
            updated = true;
            return { ...phone, value: newNumber };
          }
          return phone;
        });
  
        if (updated) {
          await fetch(`https://people.googleapis.com/v1/${contact.resourceName}:updateContact?updatePersonFields=phoneNumbers`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              resourceName: contact.resourceName,
              etag: contact.etag,
              phoneNumbers: updatedPhoneNumbers,
            }),
          });
          setProgress(((i + 1) / totalContacts) * 100);
        }
      }
  
      setIsComplete(true);
    } catch (error) {
      console.error('Error updating contacts:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  


  function processPhoneNumber(number: string): string {
    let cleaned = number.replace(/[\s-]/g, '');
  
    if (cleaned.startsWith('+229')) {
      const nationalNumber = cleaned.substring(4);
      if (/^\d{8}$/.test(nationalNumber)) {
        return '+22901' + nationalNumber;
      }
      return cleaned;
    }
  
    if (/^\d{8}$/.test(cleaned)) {
      return '+22901' + cleaned;
    }
  
    return number;
  }
  
  return (
    <div className="space-y-6">
      <button
        onClick={updateContacts}
        disabled={isUpdating}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
      >
        <RefreshCw className={`w-5 h-5 ${isUpdating ? 'animate-spin' : ''}`} />
        Importer et Mettre à jour mes contacts
      </button>

      {isUpdating && (
        <div className="w-full max-w-md">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Mise à jour des contacts... {Math.round(progress)}%</p>
        </div>
      )}

      {isComplete && (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>Vos contacts ont été mis à jour avec succès!</span>
        </div>
      )}
    </div>
  );
};