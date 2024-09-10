'use client';

import { useAuth } from '@/components/authProvider';
import BaseLayout from '@/components/layout/baseLayout';
import { fetcher } from '@/lib/fetcher';

export default function Home() {
  const auth = useAuth();

  return (
    <BaseLayout>
      <div className="my-12 flex flex-col items-center gap-12">
        <div className="text-2xl text-center sm:text-left dark:text-secondary-foreground">
          {auth.isAuthenticated ? `Hello ${auth.username}` : 'Hello guest'}
        </div>
      </div>
    </BaseLayout>
  );
}
