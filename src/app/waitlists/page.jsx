'use client';

import { useAuth } from '@/components/authProvider';
import Image from 'next/image';
import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Navbar } from '@/components/navbar';
import BaseLayout from '@/components/layout/baseLayout';

const WAITLIST_API_URL = '/api/waitlists';

// Utility function to format date as yyyy-mm-dd
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function WaitlistPage() {
  const { data, error } = useSWR(WAITLIST_API_URL, fetcher);
  const auth = useAuth();
  console.log('status: ', error?.status);

  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequiredRedirect();
    }
  }, [auth, error]);

  if (!data && !error) {
    return <div>Loading...</div>; // Handling the loading state
  }

  if (error) {
    return <div>Failed to load</div>;
  }

  return (
    <BaseLayout>
      <div className="text-sm font-[family-name:var(--font-geist-mono)] my-12">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Updated</th>
              <th className="border p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{formatDate(item.updated)}</td>
                <td className="border p-2">{formatDate(item.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BaseLayout>
  );
}
