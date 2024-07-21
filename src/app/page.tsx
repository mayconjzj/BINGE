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

export default function Home() {
  return (
    <main>
      <TopRated
        loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
      />
    </main>
  );
}
