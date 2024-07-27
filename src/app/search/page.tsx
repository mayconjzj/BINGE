import dynamic from 'next/dynamic';

import { ILoadMediaService } from '@/interfaces/ILoadMediaService';
import { GetMediaServiceGateway } from '@/services/api/GetMediaServiceGateway';
import { HttpClientFactory } from '@/services/HttpClientFactory';

export type SearchProps = {
  loadMediaService: ILoadMediaService;
  searchParams: {
    query: string;
    page: string;
  };
};

export const generateMetadata = ({ searchParams }: SearchProps) => {
  return {
    title: `Pesquisa ${searchParams.query || ''}`,
    description: `${searchParams.query && `Procurando no Quasar por: ${searchParams.query}`}`,
    openGraph: {
      title: `Pesquisa ${searchParams.query || ''}`,
      description: `${searchParams.query && `Procurando no Quasar por: ${searchParams.query}`}`
    },
    twitter: {
      title: `Pesquisa ${searchParams.query || ''}`,
      description: `${searchParams.query && `Procurando no Quasar por: ${searchParams.query}`}`
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/search`
    }
  };
};

const Search = dynamic(
  () => import('./Search').then((module) => module.Search),
  {
    loading: () => (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }
);

export default async function SearchPage({ searchParams }: SearchProps) {
  return (
    <Search
      loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
      searchParams={searchParams}
    />
  );
}
