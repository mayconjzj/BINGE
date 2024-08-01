import Link from 'next/link';

import { Gallery, ILoadMediaService } from '@/interfaces/ILoadMediaService';

import { MediaPoster } from '../shared/MediaPoster';
import { Skeleton } from '../shared/Skeleton';

export type MediaCollectionProps = {
  loadMediaService: ILoadMediaService;
  media_type: string;
};

export const MediaCollection = async ({
  loadMediaService,
  media_type
}: MediaCollectionProps) => {
  const [dataTrendings, dataCategories] = await Promise.all([
    loadMediaService.loadMediaTrendings({ type: media_type }),
    loadMediaService.loadMediaGenres({ type: media_type })
  ]);

  const reelsAndCategories = await Promise.all(
    dataCategories.body.genres.map(async (category) => {
      const mediaContent = await loadMediaService.loadMediaByGenre({
        id: category.id,
        type: media_type
      });

      return {
        id: category.id,
        name: category.name,
        media: mediaContent.body.results
      };
    })
  );

  const collection = [
    { id: 1, name: 'Destaques', media: dataTrendings.body.results },
    ...reelsAndCategories
  ] as Gallery[];

  return (
    <section className="px-2 md:px-[30px]">
      {collection.map((genre) => (
        <div key={genre.id} className="w-full my-[30px]">
          <h2 className="font-bold text-2xl">{genre.name}</h2>
          <ul className="overflow-x-auto flex">
            {genre.media.map((media) => (
              <li key={media.id}>
                <Link
                  href={`/discover/${media_type}/${media.id}`}
                  aria-label="Detalhes"
                >
                  {media.poster_path && (
                    <MediaPoster
                      className="object-cover min-w-[150px] h-[225px] scale-90 hover:scale-100 duration-200"
                      alt={media.title || media.name}
                      posterPath={media.poster_path}
                    />
                  )}
                  {!media.poster_path && (
                    <Skeleton className="min-w-[150px] h-[225px] scale-90" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
