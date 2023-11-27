import {IDiaryRepository} from "./abstractions/i-diary-repository";
import {environment} from "../environments/environment";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.config";
import IHttpService from "./abstractions/i-http-service";
import {Diary} from "../models/diary";
import {ArchivedDiaryMetadata} from "../models/dto/archived-diary-metadata";
import {SharedDiaryMetadata} from "../models/dto/shared-diary-metadata";
import {DiaryMetadata} from "../models/dto/diary-metadata";
import {DiaryArchivationDto} from "../models/dto/diary-archivation-dto";
import {DiaryUpsertDto} from "../models/dto/diary-upsert-dto";

@Injectable({providedIn: 'root'})
export class ApiDiaryRepository implements IDiaryRepository {
  private readonly serverApiUrl : string = environment.serverApiUrl;
  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService: IHttpService) {

  }

  getDiary(diaryId: number): Promise<Diary>
  {
    return this.httpService.get(new URL(`${this.serverApiUrl}diaries/get`), {diaryId: diaryId});
  }

  getArchivedDiaries(userId : number): Promise<ArchivedDiaryMetadata[]>
  {
    return this.httpService.get(new URL(`${this.serverApiUrl}diaries/get/user/archived`), {userId: userId});
  }

  getSharedDiaries(userId : number): Promise<SharedDiaryMetadata[]>
  {
    return this.httpService.get(new URL(`${this.serverApiUrl}diaries/get/user/shared`), {userId: userId});
  }

  getArchivedDiary(diaryId: number): Promise<Diary>
  {
    return this.httpService.get(new URL(`${this.serverApiUrl}diaries/get/archived`), {diaryId: diaryId});
  }

  getUserDiaries(userId : number): Promise<DiaryMetadata[]>
  {
    return this.httpService.get(new URL(`${this.serverApiUrl}diaries/get/user`), {userId: userId});
  }

  archivateDiary(model: DiaryArchivationDto): Promise<void>
  {
    return this.httpService.put(new URL(`${this.serverApiUrl}diaries/put/archive`), model);
  }

  unarchivateDiary(diaryId: number): Promise<void>
  {
    return this.httpService.put(new URL(`${this.serverApiUrl}diaries/put/unarchive/${diaryId}`));
  }

  editDiary(model: DiaryUpsertDto): Promise<DiaryMetadata>
  {
    console.log(model);
    return this.httpService.put(new URL(`${this.serverApiUrl}diaries/put`), model);
  }

  createDiary(model: DiaryUpsertDto): Promise<DiaryMetadata>
  {
    return this.httpService.post(new URL(`${this.serverApiUrl}diaries/post`), model);
  }

  deleteDiary(diaryId: number): Promise<void>
  {
    return this.httpService.delete(new URL(`${this.serverApiUrl}diaries/delete`), {diaryId: diaryId});
  }
}
