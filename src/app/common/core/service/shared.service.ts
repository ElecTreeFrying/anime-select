import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  scrollChanged = new Subject();

  piratesChanged = new Subject();
  autocompleteChanged = new Subject();

  constructor() { }

  set setScroll(change: any) {
    this.scrollChanged.next(change)
  }

  set setPirates(change: any) {
    this.piratesChanged.next(change);
  }

  set setAutocomplete(change: any) {
    this.autocompleteChanged.next(change);
  }

}
