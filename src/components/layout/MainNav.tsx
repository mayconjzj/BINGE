'use client';

import { FaBars } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

import { useIsOpen } from '@/hooks/useIsOpen';

import { ActiveLink } from '../shared/ActiveLink';
import { Button } from '../shared/Button';

export const MainNav = () => {
  const { isOpen, handleClick } = useIsOpen({ id: 'main-nav' });

  const title = isOpen ? 'Fechar' : 'Abrir';

  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex gap-x-6">
          <li>
            <ActiveLink href="/">Incío</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/discover/movies">Filmes</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/discover/series">Séries</ActiveLink>
          </li>
        </ul>
      </nav>

      <Button
        title={title}
        onClick={handleClick}
        variant={'link'}
        size={'icon'}
        className="md:hidden"
      >
        {isOpen && <FaX className="w-7 h-7" />}
        {isOpen || <FaBars className="w-7 h-7" />}
      </Button>

      <nav
        id="main-nav"
        className={`md:hidden fixed top-[70px] right-2 shadow-lg bg-background/90 p-4 w-44 h-44 duration-300 rounded-xl ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <ul className="flex flex-col gap-2 font-bold">
          <li>
            <ActiveLink href="/">Incío</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/movies">Filmes</ActiveLink>
          </li>
          <li>
            <ActiveLink href="/series">Séries</ActiveLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
