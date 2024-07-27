import dynamic from 'next/dynamic';

import { ILoadMediaService } from '@/interfaces/ILoadMediaService';
import { GetMediaServiceGateway } from '@/services/api/GetMediaServiceGateway';
import { HttpClientFactory } from '@/services/HttpClientFactory';

import { Skeleton } from '@/components/shared/Skeleton';

export type MediaInfoProps = {
  loadMediaService: ILoadMediaService;
  params: {
    id: number;
    media_type: string;
  };
};

export const generateMetadata = async ({ params }: MediaInfoProps) => {
  const loadMediaService = new GetMediaServiceGateway(HttpClientFactory());
  const { body: dataMediaInfo } = await loadMediaService.loadMediaInfo({
    id: params.id,
    type: params.media_type
  });

  return {
    title: `Detalhes ${dataMediaInfo.title || dataMediaInfo.name}`,
    description: dataMediaInfo.overview,
    openGraph: {
      title: `Detalhes ${dataMediaInfo.title || dataMediaInfo.name}`,
      description: dataMediaInfo.overview,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/w1280${dataMediaInfo.backdrop_path}`,
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: {
      title: `Detalhes ${dataMediaInfo.title || dataMediaInfo.name}`,
      description: dataMediaInfo.overview,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${dataMediaInfo.backdrop_path}`,
          width: 1200,
          height: 630
        }
      ]
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/discover/${params.media_type}/${params.id}`
    }
  };
};

const MediaBackdrop = dynamic(
  () => import('./MediaBackdrop').then((module) => module.MediaBackdrop),
  {
    loading: () => <div className="h-[100vh] relative -z-10 bg-black" />
  }
);

const MediaDetails = dynamic(
  () => import('./MediaDetails').then((module) => module.MediaDetails),
  {
    loading: () => (
      <section className="space-y-3">
        <Skeleton className="w-96 h-14" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="w-24 h-8" key={i} />
          ))}
        </div>
        <Skeleton className="max-w-[1000px] h-4" />
        <Skeleton className="max-w-[800px] h-4" />
        <Skeleton className="w-60 h-6" />
      </section>
    )
  }
);
const MediaCredits = dynamic(
  () => import('./MediaCredits').then((module) => module.MediaCredits),
  {
    loading: () => (
      <section className="space-y-3">
        <Skeleton className="w-60 h-6" />
        <Skeleton className="w-24 h-8" />
        <div className="flex gap-3 overflow-auto">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton className="min-w-[150px] h-[225px] scale-90" key={i} />
          ))}
        </div>
      </section>
    )
  }
);

const MediaTrailers = dynamic(
  () => import('./MediaTrailers').then((module) => module.MediaTrailers),
  {
    loading: () => (
      <section className="space-y-3">
        <Skeleton className="w-40 h-8" />
        <div className="flex gap-3 overflow-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton className="min-w-[400px] h-[225px]" key={i} />
          ))}
        </div>
      </section>
    )
  }
);

export default async function MediaInfo({ params }: MediaInfoProps) {
  return (
    <main>
      <MediaBackdrop
        loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
        params={params}
      />
      <article className="p-2 md:px-[30px] space-y-3 -mt-[50vh]">
        <MediaDetails
          loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
          params={params}
        />
        <MediaCredits
          loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
          params={params}
        />
        <MediaTrailers
          loadMediaService={new GetMediaServiceGateway(HttpClientFactory())}
          params={params}
        />
      </article>
    </main>
  );
}
