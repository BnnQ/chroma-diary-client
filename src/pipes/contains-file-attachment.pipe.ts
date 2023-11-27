import {Pipe, PipeTransform} from "@angular/core";
import {Attachment} from "../models/attachment";

@Pipe({name: 'containsFileAttachment'})
export class ContainsFileAttachmentPipe implements PipeTransform
{
    transform(attachments: Attachment[]): boolean
    {
        if (attachments == null)
            return false;

        return attachments.some(attachment => !attachment.image && !attachment.video);
    }
}
