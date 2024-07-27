import { HttpClient } from '@/interfaces/http/http';

import { AxiosHttpClientAdapater } from './AxiosHttpClientAdapter';

export const HttpClientFactory = (): HttpClient =>
  new AxiosHttpClientAdapater();
