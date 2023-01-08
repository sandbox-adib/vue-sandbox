import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

export function isAxiosError(value: any): value is AxiosError {
  return typeof value?.response === 'object';
}

export abstract class AbstractApiService {
  protected readonly http: AxiosInstance;

  protected constructor(
    protected readonly path?: string,
    // @ts-ignore
    protected readonly baseURL: string = import.meta.env.VITE_SERVICE_ENDPOINT ?? '/',
    // protected readonly appIdDummyApi: string = import.meta.env.VITE_APP_ID_DUMMYAPI ?? '',
  ) {
    if (path) {
      baseURL += path;
    }
    this.http = axios.create({
      baseURL,
      // ... further stuff, e.g. `withCredentials: true`
    });

    this.http.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';
    this.http.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
    // this.http.defaults.headers.common['app-id'] = appIdDummyApi;
    this.http.interceptors.request.use(
      config => {
      const accessToken = localStorage.getItem('accessToken')
       if (accessToken) {
         //@ts-ignore
         config.headers!.Authorization = `Bearer ${accessToken}`;
       }
       return config
     },
     error => {
       return Promise.reject(error)
     },);
    this.http.interceptors.response.use();
    this.http.interceptors.response.use();
  }


  protected createParams(record: Record<string, any>): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in record) {
      if (Object.prototype.hasOwnProperty.call(record, key)) {
        const value: any = record[key];
        if (value !== null && value !== undefined) {
          params.append(key, value);
        } else {
          console.debug(`Param key '${key}' was null or undefined and will be ignored`);
        }
      }
    }
    return params;
  }

  protected handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      if (isAxiosError(error)) {
        if (error.response) {
          throw error;
        } else if (error.request) {
          throw new Error(error as any);
        }
      } else {
        throw new Error(error.message);
      }
    }
    throw new Error(error as any);
  }
}