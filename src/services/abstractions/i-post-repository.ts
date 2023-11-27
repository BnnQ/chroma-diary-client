import {Post} from "../../models/post";
import {PostUpsertDto} from "../../models/dto/post-upsert-dto";

export interface IPostRepository
{
  getPosts(diaryId: number, page : number, itemsPerPage : number): Promise<Post[]>;
  createPost(model: PostUpsertDto): Promise<Post>;
  editPost(model: PostUpsertDto): Promise<Post>;
  deletePost(postId: number): Promise<void>;
}
