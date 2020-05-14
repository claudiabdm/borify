import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '00:00';
    }
    const minutes: number = Math.floor(value / 60);
    return `${minutes.toString().padStart(2, '0')}:${Math.ceil(value - minutes * 60).toString().padStart(2, '0')}`;
 }
}
