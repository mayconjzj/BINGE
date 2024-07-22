import { HttpClient, HttpResponse } from '@/interfaces/http/http';
import {
  ILoadMediaService,
  MediaDetails,
  MediaProps,
  MediaResults
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

  async loadMediaGenres({ type }: { type: MediaProps['type'] }) {
    return await this.httpClient.request({
      method: 'GET',
      url: `/genre/${type}/list`
    });
  }

  async loadMediaByGenre({ type, id }: MediaProps) {
    return await this.httpClient.request({
      method: 'GET',
      url: `/discover/${type}?with_genres=${id}&page=1`
    });
  }
}
