'use client';

import { useRouter } from 'next/navigation';

const LOGOUT_URL = '/api/logout';

export default function LogoutPage() {
  const router = useRouter();
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
        // Optionally, redirect or clear user data after logout
        router.replace('/');
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
    <div className="h-[95vh]">
      <div className="max-w-md mx-auto py-5 ">
        <h1 className="text-center text-4xl m-10">
          Are you sure you want to logout?
        </h1>

        <button
          type="button"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mx-auto"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
