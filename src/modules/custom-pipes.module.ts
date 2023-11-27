import {NgModule} from "@angular/core";
import {ContrastColorPipe} from "../pipes/contrast-color.pipe";
import {CommonModule} from "@angular/common";
import {CountdownDateDaysPipe} from "../pipes/countdown-date-days.pipe";
import {ContainsMediaAttachmentPipe} from "../pipes/contains-media-attachment.pipe";
import {ContainsFileAttachmentPipe} from "../pipes/contains-file-attachment.pipe";
import {GetAttachmentClassesPipe} from "../pipes/get-attachment-classes.pipe";
import {FileSizePipe} from "../pipes/file-size.pipe";

@NgModule({
  declarations: [ContrastColorPipe, CountdownDateDaysPipe, ContainsMediaAttachmentPipe, ContainsFileAttachmentPipe, GetAttachmentClassesPipe, FileSizePipe],
  imports: [CommonModule],
  exports: [ContrastColorPipe, CountdownDateDaysPipe, ContainsMediaAttachmentPipe, ContainsFileAttachmentPipe, GetAttachmentClassesPipe, FileSizePipe]
})
export class CustomPipesModule { }
