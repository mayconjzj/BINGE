import Link from 'next/link';

import { ILoadMediaService } from '@/interfaces/ILoadMediaService';

import { Button } from '@/components/shared/Button';
import { MediaPoster } from '@/components/shared/MediaPoster';
import { Skeleton } from '@/components/shared/Skeleton';

import { formatDate } from '@/utils/FormatDate';

import { SearchProps } from './page';
import { PaginationLinks } from './PaginationLinks';

export const Search = async ({
  loadMediaService,
  searchParams
}: SearchProps & { loadMediaService: ILoadMediaService }) => {
  const { body: searchResults } = await loadMediaService.loadMediaSearch({
    page: searchParams.page,
    query: searchParams.query
  });

  return (
    <main className="pt-[70px] pb-8 md:px-8 px-2 flex flex-col gap-4 max-w-[1200px] m-auto">
      <section className="w-full gap-4 flex flex-col">
        <span className="font-medium">
          {searchResults.total_results} resultados para &quot;
          {searchParams.query}
          &quot;
        </span>
        {searchResults.results.length === 0 && (
          <div className="flex flex-col items-center gap-2">
            <p className="mt-8">Nenhum resultado encontrado</p>
            <Link href="/discover/movies" aria-label="Voltar">
              <Button>Voltar</Button>
            </Link>
          </div>
        )}
        {searchResults.results.map((result) => (
          <div
            key={result.id}
            className="flex gap-x-4 gap-y-2 rounded-xl overflow-hidden"
          >
            {result.poster_path && (
              <Link
                href={`/discover/${result.media_type}/${result.id}`}
                aria-label={result.title || result.name}
              >
                <MediaPoster
                  className="min-w-[150px] min-h-[225px] scale-100"
                  alt={result.title || result.name}
                  posterPath={result.poster_path}
                />
              </Link>
            )}
            {!result.poster_path && (
              <Skeleton className="min-w-[150px] min-h-[225px] scale-100" />
            )}
            <div className="flex flex-col gap-1 h-[200px] m-auto relative w-full">
              <Link
                href={`/discover/${result.media_type}/${result.id}`}
                aria-label={result.title || result.name}
              >
                <h2 className="font-bold text-xl line-clamp-1">
                  {result.title || result.name}
                </h2>
              </Link>
              {result.release_date ||
                (result.first_air_date && (
                  <span className="font-light">
                    {formatDate(
                      `${result.release_date || result.first_air_date}`
                    )}
                  </span>
                ))}
              {result.vote_average && (
                <div className="border-[1px] border-foreground w-16 h-16 rounded-xl flex flex-col items-center justify-center">
                  <span className="font-semibold text-[12px]">Pontos</span>
                  <span className="font-bold text-xl">
                    {Math.round(result.vote_average * 10) / 10}
                  </span>
                </div>
              )}
              {result.overview && (
                <div className="line-clamp-2 bottom-0 absolute">
                  {result.overview}
                </div>
              )}
            </div>
          </div>
        ))}
        <PaginationLinks
          currentPage={searchResults.page}
          totalPages={searchResults.total_pages}
          endpoint={`/search?query=${searchParams.query}`}
        />
      </section>
    </main>
  );
};
