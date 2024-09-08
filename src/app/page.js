'use client';

import { useAuth } from '@/components/authProvider';
import { ThemeToggleButton } from '@/components/themeToggleButton';
import { fetcher } from '@/lib/fetcher';
import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link'; // Import Next.js Link
import { Button } from '@/components/ui/button'; // Assuming you're using ShadCN's Button component

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* Use Link for client-side navigation */}
          <Link href="http://127.0.0.1:3001/" passHref>
            <Button>Home</Button>
          </Link>
          <Link href="http://127.0.0.1:3001/waitlists" passHref>
            <Button>Waitlists</Button>
          </Link>
          <Link href="http://127.0.0.1:3001/login" passHref>
            <Button>Login</Button>
          </Link>
          <Link href="http://127.0.0.1:3001/logout" passHref>
            <Button>Logout</Button>
          </Link>
          <ThemeToggleButton />
        </div>

        <div className="text-sm text-center sm:text-left">
          {auth.isAuthenticated ? 'Hello user' : 'Hello guest'}
        </div>
        <div className="text-sm text-center sm:text-left">
          {JSON.stringify(data)}
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </Link>
      </footer>
    </div>
  );
}
