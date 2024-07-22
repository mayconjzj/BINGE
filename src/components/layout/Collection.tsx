import { ILoadMediaService } from '@/interfaces/ILoadMediaService';

import { MediaCollection } from '../shared/MediaCollection';

export type CollectionProps = {
  loadMediaService: ILoadMediaService;
};

export const Collection = async ({ loadMediaService }: CollectionProps) => {
  const [trendingsMovies, trendingsSeries] = await Promise.all([
    loadMediaService.loadMediaTrendings({ type: 'movie' }),
    loadMediaService.loadMediaTrendings({ type: 'tv' })
  ]);

  return (
    <section className="px-2 md:px-[30px]">
      {trendingsMovies && (
        <MediaCollection title="Filmes" trendings={trendingsMovies} />
      )}
      {trendingsSeries && (
        <MediaCollection title="Séries" trendings={trendingsSeries} />
      )}
    </section>
  );
};
