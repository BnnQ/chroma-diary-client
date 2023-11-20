import axios, {ResponseType} from "axios";
import {Injectable} from "@angular/core";
import IHttpService, {IOptions} from "./abstractions/i-http-service";
import {IHttpParameters} from "../models/abstractions/i-http-parameters";
import {IHttpHeaders} from "../models/abstractions/i-http-headers";
import {UrlParametersHelper} from "../utils/url-parameters-helper";

@Injectable({providedIn: 'root'})
export class AxiosHttpService implements IHttpService {
  async get<T>(url: URL, routeParameters?: IHttpParameters, queryParameters?: IHttpParameters,
               headers?: IHttpHeaders, options? : IOptions): Promise<T> {
    const mappedUrl: string = UrlParametersHelper.mapRouteAndQueryParametersToUrl(url,
      routeParameters,
      queryParameters);

    const response = await axios.get<T>(mappedUrl, {
      headers: headers,
      withCredentials: true,
      responseType: options?.responseType as ResponseType
    });

    return response.data;
  }

  async post<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
                queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T> {
    const mappedUrl: string = UrlParametersHelper.mapRouteAndQueryParametersToUrl(url,
      routeParameters,
      queryParameters);

    const response = await axios.post<T>(mappedUrl, body, {
      headers: headers,
      withCredentials: true
    });

    return response.data;
  }

  async put<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
               queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T> {
    const mappedUrl: string = UrlParametersHelper.mapRouteAndQueryParametersToUrl(url,
      routeParameters,
      queryParameters);

    const response = await axios.put<T>(mappedUrl, body, {
      headers: headers,
      withCredentials: true
    });

    return response.data;
  }

  async delete<T>(url: URL, routeParameters?: IHttpParameters,
                  queryParameters?: IHttpParameters, headers?: IHttpHeaders): Promise<T> {
    const mappedUrl: string = UrlParametersHelper.mapRouteAndQueryParametersToUrl(url,
      routeParameters,
      queryParameters);
    const response = await axios.delete<T>(mappedUrl, {
      headers: headers,
      withCredentials: true
    });

    return response.data;
  }
}
