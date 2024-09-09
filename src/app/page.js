'use client';

import { useAuth } from '@/components/authProvider';
import Footer from '@/components/footer';
import BaseLayout from '@/components/layout/baseLayout';
import { Navbar } from '@/components/navbar';

import { fetcher } from '@/lib/fetcher';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const auth = useAuth();
  const { data, error, isLoading } = useSWR(
    'http://127.0.0.1:8000/api/hello',
    fetcher
  );

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BaseLayout>
      <div className="my-12 flex flex-col items-center gap-12">
        <div className="text-sm text-center sm:text-left">
          {auth.isAuthenticated ? 'Hello user' : 'Hello guest'}
        </div>
        <div className="text-sm text-center sm:text-left ">
          {JSON.stringify(data)}
        </div>
      </div>
    </BaseLayout>
  );
}
