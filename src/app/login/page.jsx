'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/components/authProvider';

const LOGIN_URL = '/api/login';

const LoginPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formDataObject);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };

    // Correctly use the LOGIN_URL variable
    const response = await fetch(LOGIN_URL, requestOptions);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log('logged in');
      auth.login();
      router.replace('/');
    } else {
      console.error('Failed to login:', response.status, response.statusText);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="p-2 border rounded"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Login
          </button>
        </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
        </a>
      </footer>
    </div>
  );
};

export default LoginPage;
