import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringHelper'
})
export class StringHelperPipe implements PipeTransform {

  transform(value: string, option): string {

    if (value === null) return '';

    if (option === 'camelcase') {
      return this.camelcase(value);
    }
  }

  camelcase(value: string) {
    return value.split(' ').map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    }).join(' ');
  }

}
