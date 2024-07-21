import Link from 'next/link';

import { ILoadMediaService } from '@/interfaces/ILoadMediaService';

import { firstDateYear } from '@/utils/FirstDateYear';

import { Button } from '../shared/Button';
import { MediaBackdrop } from '../shared/MediaBackdrop';

export type TopRatedProps = {
  loadMediaService: ILoadMediaService;
};

export const TopRated = async ({ loadMediaService }: TopRatedProps) => {
  const trendings = await loadMediaService.loadMediaTrendings({ type: 'all' });
  const { id, media_type: type } =
    trendings.body.results[
      Math.floor(Math.random() * trendings.body.results.length)
    ];

  const topRated = await loadMediaService.loadMediaInfo({ type, id });

  return (
    <article className="h-[85vh] relative w-full p-2 md:px-[30px] text-foreground">
      <MediaBackdrop topRated={topRated} />
      <div className="absolute inset-0 bg-gradient-to-b to-background/100 from-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/100 to-transparent" />

      <div className="absolute flex flex-col gap-3 h-full justify-end md:justify-center">
        <h1 className="font-bold text-5xl line-clamp-2">
          {topRated.body.title || topRated.body.name}
        </h1>
        <div className="text-[18px] font-bold flex gap-3">
          {topRated.body.vote_average > 0 && (
            <div>
              {Math.round(topRated.body.vote_average * 10) / 10}{' '}
              <span className="text-[#46d369]">pontos</span>
            </div>
          )}
          <div>
            {topRated.body.release_date &&
              firstDateYear(topRated.body.release_date)}
            {topRated.body.first_air_date &&
              firstDateYear(topRated.body.first_air_date)}
          </div>
          <div>
            {topRated.body.runtime > 0 && `${topRated.body.runtime} minutos`}
            {topRated.body.number_of_seasons > 0 &&
              `${topRated.body.number_of_seasons} temporadas`}
          </div>
        </div>

        <p className="max-w-[600px] line-clamp-3">{topRated.body.overview}</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/discover/${type}/${topRated.body.id}`}>Detalhes</Link>
          </Button>
        </div>
        <div>
          <span className="font-bold">Gêneros: </span>
          <span className="text-muted-foreground">
            {topRated.body.genres?.map((genre) => genre.name).join(', ')}{' '}
          </span>
        </div>
      </div>
    </article>
  );
};
