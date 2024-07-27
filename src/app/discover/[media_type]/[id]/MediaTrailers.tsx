import { MediaInfoProps } from './page';

export const MediaTrailers = async ({
  loadMediaService,
  params
}: MediaInfoProps) => {
  const { body: dataMediaTrailers } = await loadMediaService.loadMediaTrailers({
    id: params.id,
    type: params.media_type
  });

  return (
    <section>
      {dataMediaTrailers?.results?.length > 0 && (
        <>
          <h2 className="font-bold text-2xl">
            {dataMediaTrailers?.results?.length > 1 ? 'Trailers' : 'Trailer'}
          </h2>
          <div className="flex gap-x-3 overflow-auto">
            {dataMediaTrailers?.results?.map((trailer) => (
              <div
                key={trailer.id}
                className="min-w-[400px] h-[225px] scale-95"
              >
                <iframe
                  className="w-full h-full aspect-video"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
