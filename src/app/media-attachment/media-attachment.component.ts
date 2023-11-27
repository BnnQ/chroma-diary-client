import {Component, HostBinding, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Attachment} from "../../models/attachment";

@Component({
  selector: 'app-media-attachment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-attachment.component.html'
})
export class MediaAttachmentComponent
{
  @Input({required: true}) mediaAttachment: Attachment = null!;
  @Input({required: true}) @HostBinding('class') classes: string = null!;
}
