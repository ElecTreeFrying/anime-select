import { Injectable } from '@angular/core';

function getWindow(): any {
  return window;
}

@Injectable()
export class WindowRefService {

  constructor() { }

  get getNativeWindow(): any {
    return getWindow();
  }

}
