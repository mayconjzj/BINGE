import { HttpClient, HttpResponse } from '@/interfaces/http/http';

import { AxiosHttpClientAdapater } from './AxiosHttpClientAdapter';

export const HttpClientFactory = <R>(): HttpClient<HttpResponse<R>> =>
  new AxiosHttpClientAdapater();
