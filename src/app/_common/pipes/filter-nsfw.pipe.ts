import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNsfw'
})
export class FilterNsfwPipe implements PipeTransform {

  transform(value: any[], isNSFW: boolean): any[] {

    if (value === undefined) return [];

    return value.filter(E => E['nsfw'] === isNSFW);
  }

}
