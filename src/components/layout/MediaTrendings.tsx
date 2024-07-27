import { ILoadMediaService } from '@/interfaces/ILoadMediaService';

import { MediaCollection } from '../shared/MediaCollection';

export type MediaTrendingsProps = {
  loadMediaService: ILoadMediaService;
};

export const MediaTrendings = async ({
  loadMediaService
}: MediaTrendingsProps) => {
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
