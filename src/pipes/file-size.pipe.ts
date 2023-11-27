import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform
{
  transform(size: number, unit: string = 'auto'): string {
    if (!size) {
      return '';
    }

    const units = ['bytes', 'KB', 'MB', 'GB'];
    let calculatedSize = size;
    let calculatedUnit = units[0];

    if (unit === 'auto') {
      let unitIndex = 0;
      while (calculatedSize >= 1024 && unitIndex < units.length - 1) {
        calculatedSize /= 1024;
        unitIndex++;
      }
      calculatedUnit = units[unitIndex];
    } else if (units.includes(unit)) {
      const unitIndex = units.indexOf(unit);
      calculatedSize /= Math.pow(1024, unitIndex);
      calculatedUnit = unit;
    }

    return `${calculatedSize.toFixed(2)} ${calculatedUnit}`;
  }
}
