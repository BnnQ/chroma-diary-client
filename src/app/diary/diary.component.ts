import {Component, Inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiaryPermissions} from "../../models/dto/diary-permissions";
import {CustomPipesModule} from "../../modules/custom-pipes.module";
import {Diary} from "../../models/diary";
import {MediaAttachmentComponent} from "../media-attachment/media-attachment.component";
import {PostUpsertComponent} from "../post-upsert/post-upsert.component";
import {UpsertMode} from "../../models/enums/upsert-mode";
import {PostUpsertDto} from "../../models/dto/post-upsert-dto";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IPostRepository} from "../../services/abstractions/i-post-repository";
import {Post} from "../../models/post";
import {Attachment} from "../../models/attachment";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {CustomDirectivesModule} from "../../modules/custom-directives.module";

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule, CustomPipesModule, MediaAttachmentComponent, PostUpsertComponent, InfiniteScrollModule, CustomDirectivesModule],
  templateUrl: './diary.component.html'
})
export class DiaryComponent implements OnInit
{
  @Input({required: true}) diary: Diary = null!;
  @Input({required: true}) permissions: DiaryPermissions = null!;

  posts: Post[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IPostRepository) private readonly postRepository : IPostRepository
  ) { }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  loadData()
  {
    if (this.diary)
    {
      this.toggleLoading();
      this.postRepository.getPosts(this.diary.id, this.currentPage, this.itemsPerPage).then((posts) => {
        this.posts = this.posts.concat(posts);
        console.log(this.posts);
        this.toggleLoading();
      });
    }
  }

  onScroll() {
    this.currentPage++;
    this.loadData();
  }

  filterMediaAttachments(attachments : Attachment[]): Attachment[]
  {
    return attachments.filter(attachment => attachment.image || attachment.video);
  }

  getLengthOfMediaAttachments(attachments : Attachment[]): number
  {
    return this.filterMediaAttachments(attachments).length;
  }

  filterFileAttachments(attachments : Attachment[]) : Attachment[]
  {
    return attachments.filter(attachment => !attachment.image && !attachment.video);
  }

  ngOnInit()
  {
    console.log(this.diary);
    this.loadData();
  }

  isEditing: boolean = false;
  toggleEditing()
  {
    this.isEditing = !this.isEditing;
  }

  // -- Post deletion --
  selectedPostToDelete? : Post;

  selectPostToDelete(post : Post) : void
  {
    this.selectedPostToDelete = post;
  }

  deletePost(post : Post) : void
  {
    this.postRepository.deletePost(post.id).then(() => {
      this.posts = this.posts.filter(d => d.id !== post.id);
      this.selectedPostToDelete = undefined;
    });
  }
  // -- Post deletion --

  // -- Post creation --

  createPost(model : PostUpsertDto)
  {
    this.postRepository.createPost(model).then(post => {
      this.posts.push(post);
    });
  }

  // -- Post creation --

  // -- Post edition --
  selectedPostToEdit : PostUpsertDto = new PostUpsertDto(0, '', this.diary?.id ?? 0);

  selectPostToEdit(post : Post) : void
  {
    this.selectedPostToEdit = new PostUpsertDto(post.id, post.content, this.diary?.id ?? 0);
  }

  async editPost(model : PostUpsertDto)
  {
    this.postRepository.editPost(model).then(post => {
      this.posts = this.posts.map(d => d.id === post.id ? post : d);
      this.selectedPostToEdit = new PostUpsertDto(0, '', this.diary?.id ?? 0);
    });
    //await this.postRepository.editPost(model);
  }
  // -- Post edition --


  protected readonly UpsertMode = UpsertMode;
  protected readonly Math = Math;
}
