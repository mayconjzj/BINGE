import { HttpResponse } from './http/http';

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MediaDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  name: string;
  original_name: string;
  vote_average: number;
  vote_count: number;
  media_type: string;
  gennre_ids: number[];
  video: boolean;
  number_of_episodes: number;
  number_of_seasons: number;
  first_air_date: string;
};

export type MediaResults = {
  page: number;
  results: MediaDetails[];
  total_pages: number;
  total_results: number;
};

export type MediaProps = {
  type: string;
  id: number;
};

export interface ILoadMediaService {
  loadMediaInfo: ({
    type,
    id
  }: MediaProps) => Promise<HttpResponse<MediaDetails>>;

  loadMediaTrendings: ({
    type
  }: {
    type: MediaProps['type'];
  }) => Promise<HttpResponse<MediaResults>>;
}
