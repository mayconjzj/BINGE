export type HttpRequest<Body, Headers> = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Body;
  headers?: Headers;
};

export enum HttpStatusCode {
  ok = 200,
  serverError = 500
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body: T;
};

export type HttpClient = {
  request: <R>(
    data: HttpRequest<BodyInit, Record<string, string>>
  ) => Promise<HttpResponse<R>>;
};
