import {Injectable} from "@angular/core";
import {Post} from "../models/post";
import {Attachment} from "../models/attachment";
import {IPostRepository} from "./abstractions/i-post-repository";
import {PostUpsertDto} from "../models/dto/post-upsert-dto";

@Injectable({providedIn: 'root'})
export class StubPostRepository implements IPostRepository
{
  private numberOfPosts = 15;
  private numberOfAttachments = 10;
  private attachments: Attachment[] = [];
  private posts: Post[] = [];

  constructor()
  {
    this.attachments.push(new Attachment(0, 'https://cdn.pixabay.com/photo/2023/10/17/02/14/lotus-8320293_640.jpg', true, false));
    for (let i = 1; i < this.numberOfAttachments; i++)
    {
      this.attachments.push(new Attachment(i, 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', true, false));
    }

    for (let i = 0; i < this.numberOfPosts; i++)
    {
      this.posts.push(new Post(i, '<h5>Example title</h5><p>Example content</p>', new Date(), new Date(), this.attachments))
    }
  }

  getPosts(diaryId: number, page: number = 1, itemsPerPage: number = 20): Promise<Post[]>
  {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const posts: Post[] = [];
    for (let i = startIndex; i < endIndex; i++)
    {
      if (i < this.numberOfPosts)
      {
        posts.push(this.posts[i]);
      }
    }

    return Promise.resolve(posts);
  }

  createPost(model: PostUpsertDto): Promise<Post>
  {
    const post = new Post(this.numberOfPosts + 1, model.content, new Date(), new Date(), []);
    this.numberOfPosts++;
    return Promise.resolve(post);
  }

  editPost(model: PostUpsertDto): Promise<Post>
  {
    const post = this.posts.find(post => post.id === model.id)!;
    post.content = model.content;
    post.updatedAt = new Date();

    model.fileAttachments?.forEach(attachment => console.log(attachment));
    return Promise.resolve(post);
  }

  deletePost(postId: number): Promise<void>
  {
    const post = this.posts.find(post => post.id === postId)!;
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
    return Promise.resolve();
  }

}
