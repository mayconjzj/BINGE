import dynamic from 'next/dynamic';

import { GetMediaServiceGateway } from '@/services/api/GetMediaServiceGateway';
import { HttpClientFactory } from '@/services/HttpClientFactory';

import { Skeleton } from '@/components/shared/Skeleton';

const TopRated = dynamic(
  () =>
    import('@/components/layout/TopRated').then((module) => module.TopRated),
  {
    loading: () => (
      <article className="h-[85vh] relative w-full text-foreground">
        <Skeleton className="w-full h-full" />
      </article>
    )
  }
);

const Collection = dynamic(
  () =>
    import('@/components/layout/Collection').then(
      (module) => module.Collection
    ),
  {
    loading: () => (
      <section className="px-2 md:px-[30px]">
        <div className="w-full my-[30px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <>
              <Skeleton key={i} className="w-[225px] h-8" />
              <ul className="flex overflow-auto">
                {Array.from({ length: 10 }).map((_, i) => (
                  <li key={i} className="min-w-[150px] h-[225px]">
                    <Skeleton className="min-w-[150px] h-[225px] scale-90" />
                  </li>
                ))}
              </ul>
            </>
          ))}
        </div>
      </section>
    )
  }
);

export default function Home() {
  return (
    <main>
      <TopRated
        loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
      />
      <Collection
        loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
      />
    </main>
  );
}
