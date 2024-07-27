import dynamic from 'next/dynamic';

import { GetMediaServiceGateway } from '@/services/api/GetMediaServiceGateway';
import { HttpClientFactory } from '@/services/HttpClientFactory';

import { Skeleton } from '@/components/shared/Skeleton';

type DiscoverProps = {
  params: {
    media_type: string;
  };
};

export const generateMetadata = ({ params }: DiscoverProps) => {
  const mediaType = params.media_type === 'series' ? 'Séries' : 'Filmes';

  return {
    title: `${mediaType}`,
    description: `Catalágo de ${mediaType}. Veja os ${mediaType} em destaque no Quasar.`,
    openGraph: {
      title: `${mediaType}`,
      description: `Catalágo de ${mediaType}. Veja os ${mediaType} em destaque no Quasar.`
    },
    twitter: {
      title: `${mediaType}`,
      description: `Catalágo de ${mediaType}. Veja os ${mediaType} em destaque no Quasar.`
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/discover/${params.media_type}`
    }
  };
};

const TopRated = dynamic(
  () =>
    import('@/components/layout/TopRated').then((moduele) => moduele.TopRated),
  {
    loading: () => (
      <article className="h-[85vh] relative w-full text-foreground">
        <Skeleton className="w-full h-full" />
      </article>
    )
  }
);

const MediaCollection = dynamic(
  () =>
    import('@/components/layout/MediaCollection').then(
      (moduele) => moduele.MediaCollection
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

export default async function Discover({ params }: DiscoverProps) {
  const mediaType = params.media_type === 'series' ? 'tv' : 'movie';

  return (
    <main>
      <TopRated
        loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
        media_type={mediaType}
      />

      <MediaCollection
        loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
        media_type={mediaType}
      />
    </main>
  );
}
