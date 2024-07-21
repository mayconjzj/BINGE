import Image from 'next/image';

import { HttpResponse } from '@/interfaces/http/http';
import { MediaDetails } from '@/interfaces/ILoadMediaService';

export const MediaBackdrop = ({
  topRated
}: {
  topRated: HttpResponse<MediaDetails>;
}) => {
  return (
    <Image
      className="object-cover"
      src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/w1280${topRated.body.backdrop_path}`}
      alt="dataTopRated Image"
      fill
      unoptimized
      priority
    />
  );
};
