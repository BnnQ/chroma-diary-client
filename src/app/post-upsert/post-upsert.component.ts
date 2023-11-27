import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomDirectivesModule} from "../../modules/custom-directives.module";
import {CustomPipesModule} from "../../modules/custom-pipes.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UpsertMode} from "../../models/enums/upsert-mode";
import {PostUpsertDto} from "../../models/dto/post-upsert-dto";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import Editor from "../../services/editor";

@Component({
  selector: 'app-post-upsert',
  standalone: true,
  imports: [CommonModule, CustomDirectivesModule, CustomPipesModule, FormsModule, ReactiveFormsModule, CKEditorModule],
  templateUrl: './post-upsert.component.html'
})
export class PostUpsertComponent implements OnInit {
  @Input({ required: false }) public model : PostUpsertDto = null!;
  @Input({ required: true }) public mode : UpsertMode = null!;
  @Input({ required: true }) public diaryId : number = null!;
  @Output() public submittedModelEvent = new EventEmitter<PostUpsertDto>();

  constructor() { }

  ngOnInit()
  {
    this.model = this.model ?? new PostUpsertDto(0, '', this.diaryId,[]);
  }

  onMediaAttachmentsChanged(event : any)
  {
    if (event.target.files && event.target.files.length)
    {
      this.model.mediaAttachments = event.target.files;
    }
  }

  onFileAttachmentsChanged(event : any)
  {
    if (event.target.files && event.target.files.length)
    {
      this.model.fileAttachments = event.target.files;
    }
  }

  sendSubmit(model : PostUpsertDto)
  {
    this.submittedModelEvent.emit(model);
  }

  protected readonly UpsertMode = UpsertMode;
  protected readonly Editor = Editor;
}
