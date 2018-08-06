import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'uniq'
})
export class UniqPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    return _.uniq(value, 'id');
  }

}
