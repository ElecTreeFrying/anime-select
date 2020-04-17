import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'animeDate'
})
export class AnimeDatePipe implements PipeTransform {

  months = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' 
  ];

  transform(value: string): string {

    if (value === null) return '';

    const year = value.split('-')[0];
    const month = this.months[+value.split('-')[1] - 1];
    const day = +value.split('-')[2];
    return `${month} ${day}, ${year}`;
  }

}
