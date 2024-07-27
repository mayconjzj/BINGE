import { ILoadMediaService } from '@/interfaces/ILoadMediaService';

import { MediaBackdrop as Backdrop } from '@/components/shared/MediaBackdrop';

import { MediaInfoProps } from './page';

export const MediaBackdrop = async ({
  loadMediaService,
  params
}: MediaInfoProps & { loadMediaService: ILoadMediaService }) => {
  const dataMediaInfo = await loadMediaService.loadMediaInfo({
    id: params.id,
    type: params.media_type
  });

  return (
    <article className="h-[100vh] relative -z-10">
      <Backdrop topRated={dataMediaInfo} />
      <div className="absolute inset-0 bg-gradient-to-b to-background/100 from-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/100 to-transparent" />
    </article>
  );
};
