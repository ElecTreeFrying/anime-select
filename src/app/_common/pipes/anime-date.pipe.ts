import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'animeDate'
})
export class AnimeDatePipe implements PipeTransform {

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' 
  ];

  complete = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December' 
  ];

  transform(value: string, type: string = 'default'): string {

    if (value === null) return '';

    const year = value.split('-')[0];
    const month = this.months[+value.split('-')[1] - 1];
    const complete = this.complete[+value.split('-')[1] - 1];
    const day = +value.split('-')[2];

    if (type === 'default') {
      return `${month} ${day}, ${year}`;
    } else if (type === 'short-complete') {
      return `${complete} ${year}`;
    }
  }

}
