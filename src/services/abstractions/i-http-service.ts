import {IHttpHeaders} from "../../models/abstractions/i-http-headers";
import {IHttpParameters} from "../../models/abstractions/i-http-parameters";

export interface IOptions {
  responseType? : string
}

export default interface IHttpService {
  get<T>(url: URL, routeParameters?: IHttpParameters,
         queryParameters?: IHttpParameters, headers?: IHttpHeaders, options?: IOptions): Promise<T>;

  post<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
          queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T>;

  put<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
         queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T>;

  delete<T>(url: URL, routeParameters?: IHttpParameters,
            queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T>
}
