import {IPermissionManager} from "./abstractions/i-permission-manager";
import {DiaryPermissions} from "../models/dto/diary-permissions";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.config";
import IHttpService from "./abstractions/i-http-service";
import {environment} from "../environments/environment";
import {Contributor} from "../models/contributor";

@Injectable({providedIn: 'root'})
export class ApiPermissionManager implements IPermissionManager
{
  private readonly serverApiUrl = environment.serverApiUrl;

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IHttpService)
    private readonly httpService : IHttpService
  )
  {
  }

  async getUserDiaryPermissions(userId: number, diaryId: number): Promise<DiaryPermissions>
  {
    return await this.httpService.get<DiaryPermissions>(new URL(`${this.serverApiUrl}permissions/${userId}/${diaryId}`));
  }

  async getDiaryContributors(diaryId: number): Promise<Contributor[]>
  {
    return await this.httpService.get<Contributor[]>(new URL(`${this.serverApiUrl}permissions/diary/${diaryId}/contributors`));
  }

  async addDiaryContributor(diaryId: number, userName: string): Promise<Contributor>
  {
    return await this.httpService.post<Contributor>(new URL(`${this.serverApiUrl}permissions/diary/${diaryId}/contributor/${userName}`), undefined);
  }

  async removeDiaryContributor(contributorId: number): Promise<void>
  {
    return await this.httpService.delete(new URL(`${this.serverApiUrl}permissions/contributor/${contributorId}`));
  }

  async changeDiaryPermissions(contributor: Contributor): Promise<Contributor>
  {
    return await this.httpService.put<Contributor>(new URL(`${this.serverApiUrl}permissions/contributor`), contributor);
  }

}
