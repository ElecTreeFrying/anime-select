import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';


@Injectable()
export class SharedService {

  autocompleteChanged = new Subject<boolean>();
  piratesChanged = new Subject<any>();
  scrollChanged = new Subject<boolean>()

  constructor() {
  }

  setAutocompleteConfig(value: boolean) {
    this.autocompleteChanged.next(value)
  }

  setPiratesValue(value: any) {
    this.piratesChanged.next(value)
  }

  setScrollValue(value: boolean) {
    this.scrollChanged.next(value)
  }

  initScrollbar() {
    Scrollbar.use(OverscrollPlugin)

    const scrollbar = Scrollbar.initAll({
      damping: 0.1,
      thumbMinSize: 10,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
      wheelEventTarget: null,
      plugins: { }
    });


  }

}
