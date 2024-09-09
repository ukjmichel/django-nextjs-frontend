'use client';

import { Button } from './ui/button';

export default function NavButton({ children }) {
  return <Button className="w-48 sm:w-auto ">{children}</Button>;
}
