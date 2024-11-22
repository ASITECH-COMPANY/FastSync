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
      // Fetch contacts
      const response = await fetch(
        'https://people.googleapis.com/v1/people/me/connections?personFields=names,phoneNumbers',
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

        for (const phone of phoneNumbers) {
          if (phone.value.startsWith('+229') && phone.value.length === 12) {
            const newNumber = '+229 01' + phone.value.slice(4);
            if (phone.value !== newNumber) {
              // Update contact
              await fetch(`https://people.googleapis.com/v1/${contact.resourceName}:updateContact`, {
                method: 'PATCH',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  etag: contact.resourceName,
                  phoneNumbers: [{ value: newNumber, metadata: phone.metadata }],
                }),
              });
              updated = true;
            }
          }
        }

        if (updated) {
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

  return (
    <div className="space-y-6">
      <button
        onClick={updateContacts}
        disabled={isUpdating}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
      >
        <RefreshCw className={`w-5 h-5 ${isUpdating ? 'animate-spin' : ''}`} />
        Import and Update Contacts
      </button>

      {isUpdating && (
        <div className="w-full max-w-md">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Updating contacts... {Math.round(progress)}%</p>
        </div>
      )}

      {isComplete && (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>Your contacts have been successfully updated!</span>
        </div>
      )}
    </div>
  );
};