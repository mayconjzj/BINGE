'use client';

import { useEffect, useState } from 'react';

import { MainNav } from './MainNav';
import { SearchMedia } from './SearchMedia';

export const Header = () => {
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setScrollActive(true) : setScrollActive(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`placeholder:px-2 md:px-[30px] px-2 h-[70px] duration-500 fixed top-0 flex justify-between gap-2 w-screen items-center z-10 ${scrollActive && 'bg-background/50 backdrop-blur-lg'}`}
    >
      <div className="text-3xl font-black text-primary">BINGE</div>

      <SearchMedia />
      <MainNav />
    </header>
  );
};
