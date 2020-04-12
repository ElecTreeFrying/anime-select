import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceString'
})
export class SliceStringPipe implements PipeTransform {

  transform(value: string, length: number): string {

    if (value === null) {
      return '';
    } 
    
    if (length === -1) {
      return value.slice(0);
    }

    if (value.length > length) {
      return value.slice(0, length) + '...';
    } else {
      return value;
    }
  }

}
