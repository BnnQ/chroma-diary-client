import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'getAttachmentClasses'})
export class GetAttachmentClassesPipe implements PipeTransform
{
  transform(i: number, mediaAttachmentsLength: number): string
  {
    let classes = '';
    switch (mediaAttachmentsLength)
    {
      case 1:
        classes = 'full-width';
        break;
      case 2:
        classes = i == 0 ? 'half-width left-image' : 'half-width right-image';
        break;
      case 3:
        switch (i)
        {
          case 0:
            classes = 'full-width';
            break;
          case 1:
            classes = 'half-width top-left-media';
            break;
          case 2:
            classes = 'half-width top-right-media';
            break;
        }
        break;
      case 4:
        switch (i)
        {
          case 0:
            classes = 'full-width top-left-media top-right-media';
            break;
          case 1:
            classes = 'half-width left-image';
            break;
          case 2:
            classes = 'half-width right-image';
            break;
          case 3:
            classes = 'full-width';
            break;
        }
        break;
      case 5:
        switch (i)
        {
          case 0:
            classes = 'half-width top-left-media';
            break;
          case 1:
            classes = 'half-width top-right-media';
            break;
          case 2:
            classes = 'full-width';
            break;
          case 3:
            classes = 'half-width left-image';
            break;
          case 4:
            classes = 'half-width right-image';
            break;
        }

        break;
      case 6:
        switch (i)
        {
          case 0:
            classes = 'third-width top-left-media';
            break;
          case 1:
            classes = 'third-width center-image';
            break;
          case 2:
            classes = 'third-width top-right-media';
            break;
          case 3:
            classes = 'full-width';
            break;
          case 4:
            classes = 'half-width left-image';
            break;
          case 5:
            classes = 'half-width left-image';
        }
        break;
      case 7:
        switch (i)
        {
          case 0:
            classes = 'third-width top-left-media';
            break;
          case 1:
            classes = 'third-width center-image';
            break;
          case 2:
            classes = 'third-width top-right-media';
            break;
          case 3:
            classes = 'full-width';
            break;
          case 4:
            classes = 'third-width';
            break;
          case 5:
            classes = 'third-width center-image';
            break;
          case 6:
            classes = 'third-width';
        }

        break;
      case 8:
        switch (i)
        {
          case 0:
            classes = 'half-width top-left-media';
            break;
          case 1:
            classes = 'half-width top-right-media';
            break;
          case 2:
          case 4:
          case 6:
            classes = 'half-width left-image';
            break;
          case 3:
          case 5:
          case 7:
            classes = 'half-width right-image';
            break;
        }

        break;
      case 9:
        switch (i)
        {
          case 0:
            classes = 'third-width top-left-media';
            break;
          case 1:
            classes = 'third-width center-image';
            break;
          case 2:
            classes = 'third-width top-right-media';
            break;
          case 3:
          case 5:
          case 7:
            classes = 'half-width left-image';
            break;
          case 4:
          case 6:
          case 8:
            classes = 'half-width right-image';
            break;
        }

        break;
      case 10:
        switch (i)
        {
          case 0:
            classes = 'third-width top-left-media';
            break;
          case 1:
            classes = 'third-width center-image';
            break;
          case 2:
            classes = 'third-width top-right-media';
            break;
          case 3:
            classes = 'third-width left-image';
            break;
          case 4:
            classes = 'third-width center-image';
            break;
          case 5:
            classes = 'third-width right-image';
            break;
          case 6:
          case 8:
            classes = 'half-width left-image';
            break;
          case 7:
          case 9:
            classes = 'half-width right-image';
            break;
        }
    }
    return classes;
  }
}
