'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ThemeToggleButton } from './themeToggleButton';

export function Navbar() {
  return (
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
  );
}
