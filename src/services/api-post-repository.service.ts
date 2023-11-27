import {IPostRepository} from "./abstractions/i-post-repository";
import {environment} from "../environments/environment";
import {Inject, Injectable} from "@angular/core";
import IHttpService from "./abstractions/i-http-service";
import {Post} from "../models/post";
import {SERVICE_IDENTIFIERS} from "../app/app.config";
import {PostUpsertDto} from "../models/dto/post-upsert-dto";

@Injectable({providedIn: 'root'})
export class ApiPostRepository implements IPostRepository
{
  private readonly serverApiUrl : string = environment.serverApiUrl;
  constructor(
    @Inject(SERVICE_IDENTIFIERS.IHttpService)
    private readonly httpService: IHttpService
  ) {
  }

  getPosts(diaryId: number, page: number, itemsPerPage: number): Promise<Post[]>
  {
    return this.httpService.get<Post[]>(new URL(`${this.serverApiUrl}posts/get`), {diaryId: diaryId}, { page: page, itemsPerPage: itemsPerPage });
  }

  createPost(model: PostUpsertDto): Promise<Post>
  {
    const formData = new FormData();
    formData.append('content', model.content);
    formData.append('diaryId', model.diaryId.toString());

    if (model.mediaAttachments)
    {
      for (let i = 0; i < model.mediaAttachments.length; i++)
      {
        formData.append('mediaAttachments[' + i + ']', model.mediaAttachments[i]);
      }
    }

    if (model.fileAttachments)
    {
      for (let i = 0; i < model.fileAttachments.length; i++)
      {
        formData.append('fileAttachments[' + i + ']', model.fileAttachments[i]);
      }
    }

    return this.httpService.post(new URL(`${this.serverApiUrl}posts/post`), formData, undefined, undefined, { 'Content-Type': 'multipart/form-data' });
  }

  editPost(model: PostUpsertDto): Promise<Post>
  {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    formData.append('content', model.content);
    formData.append('diaryId', model.diaryId.toString());

    if (model.mediaAttachments)
    {
      for (let i = 0; i < model.mediaAttachments.length; i++)
      {
        formData.append('mediaAttachments[' + i + ']', model.mediaAttachments[i]);
      }
    }

    if (model.fileAttachments)
    {
      for (let i = 0; i < model.fileAttachments.length; i++)
      {
        formData.append('fileAttachments[' + i + ']', model.fileAttachments[i]);
      }
    }

    return this.httpService.put(new URL(`${this.serverApiUrl}posts/put`), formData, undefined, undefined, { 'Content-Type': 'multipart/form-data' });
  }

  deletePost(postId: number): Promise<void>
  {
    return this.httpService.delete(new URL(`${this.serverApiUrl}posts/delete`), { postId: postId });
  }
}
