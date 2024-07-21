'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/TailwindMerge';

export type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export const ActiveLink = ({ children, ...rest }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === rest.href;

  return (
    <Link
      className={cn(
        'duration-200 cursor-pointer',
        isActive && 'border-primary border-b-2',
        rest.className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
