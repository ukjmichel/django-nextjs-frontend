import Image from 'next/image';
import { Navbar } from '../navbar';
import Footer from '../footer';

export default function BaseLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <header className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Navbar />
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
