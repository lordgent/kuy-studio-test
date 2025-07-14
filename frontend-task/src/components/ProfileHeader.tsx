'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Profile {
  name: string;
  email: string;
}

export default function ProfileHeader() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Gagal memuat profil');

        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      router.push('/login'); 
    } catch (err) {
      alert('Gagal logout.');
    }
  };

  if (!profile) return null;

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#424242] text-white font-semibold text-xl flex items-center justify-center">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-gray-800 font-semibold text-lg">{profile.name}</p>
          <p className="text-gray-500 text-sm">{profile.email}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-white border border-[#424242] text-[#424242] text-sm px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
