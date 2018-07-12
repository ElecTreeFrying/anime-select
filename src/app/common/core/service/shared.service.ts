import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import Scrollbar from 'smooth-scrollbar';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  piratesChanged = new Subject();
  autocompleteChanged = new Subject();

  scrollbar: any = undefined;

  constructor() { }

  initScrollbar() {
    this.scrollbar = Scrollbar.initAll({
      damping: 1,
      thumbMinSize: 10,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: false,
      wheelEventTarget: null,
      plugins: { }
    })
  }

  get getScrollbar() {
    return this.scrollbar;
  }

  set setPirates(change: any) {
    this.piratesChanged.next(change);
  }

  set setAutocomplete(change: any) {
    this.autocompleteChanged.next(change);
  }

}
