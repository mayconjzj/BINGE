'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

import { useIsOpen } from '@/hooks/useIsOpen';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

export const SearchMedia = () => {
  const {
    isOpen: isInputOpen,
    setIsOpen: setIsInputOpen,
    handleClick: handleInputClick
  } = useIsOpen({
    id: 'search-input'
  });

  const searchFormSchema = z.object({
    search: z.string().min(1)
  });

  const { register, handleSubmit, getValues, setValue } = useForm({
    resolver: zodResolver(searchFormSchema)
  });

  const { push } = useRouter();

  const redirectSearch = handleSubmit(() => {
    const { search } = getValues() as {
      search: string;
    };
    push(`/search?query=${search}&page=1`);
    setValue('search', '');
    setIsInputOpen(false);
  });

  return (
    <form
      onSubmit={redirectSearch}
      id="search-input"
      className={`sm:justify-center sm:w-auto sm:ml-0 flex gap-x-1 items-center justify-end w-10 h-10 px-1 overflow-hidden ml-auto duration-300 ${isInputOpen && 'w-[300px]'}`}
    >
      <Input
        type="text"
        {...register('search')}
        className="border-none shadow-none"
        placeholder="Pesquisar"
      />
      <Button
        variant="link"
        size="icon"
        type="submit"
        title="Pesquisar"
        onClick={handleInputClick}
      >
        <FaSearch size={18} />
      </Button>
    </form>
  );
};
