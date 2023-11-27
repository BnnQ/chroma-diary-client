import {ITagRepository} from "./abstractions/i-tag-repository";
import {Tag} from "../models/tag";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.config";
import IHttpService from "./abstractions/i-http-service";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class ApiTagRepository implements ITagRepository
{
  private readonly serverApiUrl = environment.serverApiUrl;

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IHttpService)
    private readonly httpService : IHttpService
  ) { }

  getTags(search: string, limit: number): Promise<Tag[]>
  {
    return this.httpService.get<Tag[]>(new URL(`${this.serverApiUrl}tags/get`), { search: search },{ limit: limit });
  }

}
