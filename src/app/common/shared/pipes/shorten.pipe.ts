import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value?: any, limit?: number, args?: any): any {
    const data = String(value);
    return data.length > limit ? `${data.substr(0, limit)}...` : data;
  }

}
