import Link from 'next/link';

import { HttpResponse } from '@/interfaces/http/http';
import { MediaResults } from '@/interfaces/ILoadMediaService';

import { MediaPoster } from './MediaPoster';
import { Skeleton } from './Skeleton';

export type MediaCollectionProps = {
  trendings: HttpResponse<MediaResults>;
  title: string;
};

export const MediaCollection = ({ trendings, title }: MediaCollectionProps) => {
  return (
    <div className="w-full my-[30px]">
      <h2 className="font-bold text-2xl">{title}</h2>
      <ul className="overflow-x-auto flex">
        {trendings.body.results.map((media) => (
          <li key={media.id}>
            <Link href={`/discover/movie/${media.id}`}>
              {media.poster_path && (
                <MediaPoster
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
  );
};
