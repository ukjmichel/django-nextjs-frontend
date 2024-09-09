'use client';

// Import dynamic from next/dynamic
import Link from 'next/link';
import { ThemeToggleButton } from './themeToggleButton';
import NavButton from './navButton';
import { useAuth } from './authProvider';

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Link href="/">
        <NavButton>Home</NavButton>
      </Link>
      <Link href="/waitlists">
        <NavButton>Waitlists</NavButton>
      </Link>
      {!isAuthenticated && (
        <Link href="/login">
          <NavButton>Login</NavButton>
        </Link>
      )}
      {isAuthenticated && (
        <Link href="/logout">
          <NavButton>Logout</NavButton>
        </Link>
      )}
      <ThemeToggleButton />
    </div>
  );
}
