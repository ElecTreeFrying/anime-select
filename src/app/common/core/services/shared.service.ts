import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SharedService {

  autocompleteChanged = new Subject<boolean>();
  piratesChanged = new Subject<any>();


  constructor() {
  }

  setAutocompleteConfig(value: boolean) {
    this.autocompleteChanged.next(value)
  }

  setPiratesValue(value: any) {
    this.piratesChanged.next(value)
  }

}
