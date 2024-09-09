'use client';

import Image from 'next/image';
import { useAuth } from '@/components/authProvider';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';

const LOGOUT_URL = '/api/logout';

export default function LogoutPage() {
  const auth = useAuth();

  const handleLogout = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    };

    try {
      const response = await fetch(LOGOUT_URL, requestOptions);

      if (response.ok) {
        console.log('Successfully logged out');
        auth.logout();
        // Optionally, redirect or clear user data after logout
      } else {
        console.error(
          'Failed to logout:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <a href="http://127.0.0.1:3001/">
          <Image
            className="dark:invert"
            src="https://nextjs.org/icons/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </a>

        {/* Dynamically change text color based on theme */}
        <h1 className="text-center text-4xl m-10 text-foreground dark:text-secondary-foreground">
          Are you sure you want to logout?
        </h1>

        {/* Button with dynamic color changes */}
        <Button
          type="button"
          onClick={handleLogout}
          className="text-xl px-12 py-6"
        >
          Logout
        </Button>
      </main>
      <Footer />
    </div>
  );
}
