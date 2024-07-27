import { HttpClient, HttpResponse } from '@/interfaces/http/http';
import {
  Genres,
  ILoadMediaService,
  MediaCredits,
  MediaDetails,
  MediaProps,
  MediaResults,
  MediaTrailers
} from '@/interfaces/ILoadMediaService';

export class GetMediaServiceGateway implements ILoadMediaService {
  constructor(readonly httpClient: HttpClient) {}

  async loadMediaInfo({
    type,
    id
  }: MediaProps): Promise<HttpResponse<MediaDetails>> {
    return await this.httpClient.request({
      method: 'GET',
      url: `/${type}/${id}`
    });
  }

  async loadMediaTrendings({
    type
  }: {
    type: MediaProps['type'];
  }): Promise<HttpResponse<MediaResults>> {
    return await this.httpClient.request({
      method: 'GET',
      url: `/trending/${type}/week`
    });
  }

  async loadMediaGenres({
    type
  }: {
    type: MediaProps['type'];
  }): Promise<HttpResponse<Genres>> {
    return await this.httpClient.request({
      method: 'GET',
      url: `/genre/${type}/list`
    });
  }

  async loadMediaByGenre({
    type,
    id
  }: MediaProps): Promise<HttpResponse<MediaResults>> {
    return await this.httpClient.request({
      method: 'GET',
      url: `/discover/${type}?with_genres=${id}&page=1`
    });
  }

  async loadMediaCredits({
    type,
    id
  }: MediaProps): Promise<HttpResponse<MediaCredits>> {
    return await this.httpClient.request({
      method: 'GET',
      url: `/${type}/${id}/credits`
    });
  }

  async loadMediaTrailers({
    type,
    id
  }: MediaProps): Promise<HttpResponse<MediaTrailers>> {
    return await this.httpClient.request({
      method: 'GET',
      url: `/${type}/${id}/videos`
    });
  }

  async loadMediaSearch({
    page,
    query
  }: {
    page: string;
    query: string;
  }): Promise<HttpResponse<MediaResults>> {
    return await this.httpClient.request({
      method: 'GET',
      url: `/search/multi?query=${query}&page=${page}`
    });
  }
}
