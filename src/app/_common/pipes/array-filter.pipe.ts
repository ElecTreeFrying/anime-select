import { Pipe, PipeTransform } from '@angular/core';
import { uniqBy } from 'lodash';

import { SharedService } from '../services/shared.service';
import { SnotifyService } from '../services/snotify.service';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  constructor(
    private shared: SharedService,
    private snotify: SnotifyService
  ) {}

  transform(value: any[], text?: string): any[] {

    if (value === null) {
      this.snotify.loadingGenreNotify();
      this.shared.updatedLoadingGenreSelection = 1;
      return [];
    } 

    if (text === 'uniqBy') {
      return uniqBy(value, 'name');
    }

    if (text.charCodeAt(0) !== 10 && text.charCodeAt(0) !== 13) {
      this.shared.updatedLoadingGenreSelection = 2;
      return value.filter(e => e['name'].toLowerCase().includes(text));        
    }

    if (text.charCodeAt(0) === 10 || text === '') {
      this.shared.updatedLoadingGenreSelection = 2;
      return value.slice(0);
    } 
    
    if (text.charCodeAt(0) === 13) {
      this.shared.updatedLoadingGenreSelection = 2;
      return [];
    }
  }

}
