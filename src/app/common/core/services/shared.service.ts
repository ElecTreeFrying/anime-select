import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Scrollbar from 'smooth-scrollbar';


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
    // return Scrollbar.initAll({
    //   damping: 0.1,
    //   thumbMinSize: 10,
    //   renderByPixels: true,
    //   alwaysShowTracks: false,
    //   continuousScrolling: true,
    //   wheelEventTarget: null,
    //   plugins: { }
    // });
    return Scrollbar.initAll();
  }

}
