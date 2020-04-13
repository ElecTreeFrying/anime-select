import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSubtype'
})
export class FilterSubtypePipe implements PipeTransform {

  transform(value: any[], route: string, option: boolean = false): any {

    if (value === null) return;

    if (option) {
      return value.filter(e => e['subtype'] === route).length > 0;
    } else {
      return value.filter(e => e['subtype'] === route);
    }
  }

}
