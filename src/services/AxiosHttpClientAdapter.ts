import { HttpClient, HttpRequest, HttpResponse } from '@/interfaces/http/http';
import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';

import { axiosInstance } from '@/lib/Axios';

export class AxiosHttpClientAdapater implements HttpClient {
  async request<T>(
    data: HttpRequest<BodyInit, Record<string, string>>
  ): Promise<HttpResponse<T>> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axiosInstance.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers as AxiosHeaders
      });
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>;
      throw new Error(_error.response?.data.message);
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
