import { Pipe, PipeTransform } from '@angular/core';

import { SharedService } from '../services/shared.service';

@Pipe({
  name: 'loadMore'
})
export class LoadMorePipe implements PipeTransform {

  constructor(
    private shared: SharedService
  ) {}

  transform(value: any[], length: number, array: string): any[] {

    if (value === null) return;
    
    if (array === 'episodes') {
      return this.episodes(value, length);
    } else if (array === 'staff') {
      return this.staff(value, length);
    }
  }
  
  episodes(value: any[], length: number) {
    if (length === -1) {
      this.shared.episodePrev = value;
      return value.slice(0, 10);
    } else {
      return this.shared.episodePrev.slice(0, length);
    }
  }
  
  staff(value: any[], length: number) {
    if (length === -1) {
      this.shared.staffPrev = value;
      return value.slice(0, 5);
    } else {
      return this.shared.staffPrev.slice(0, length);
    }
  }

}
