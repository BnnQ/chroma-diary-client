import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'contrastColor'})
export class ContrastColorPipe implements PipeTransform {
  transform(hexColor: string): string
  {
    const rgb = hexColor.charAt(0) === '#' ? parseInt(hexColor.slice(1), 16) : parseInt(hexColor, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black for bright colors and white for dark colors
    return brightness > 128 ? '#555' : '#fffeee';
  }

}
