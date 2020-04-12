import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[keyboardDefaults]'
})
export class KeyboardDefaultsDirective {

  constructor() { }

  @HostListener('window:keydown', [ '$event' ])
  keydown(event: KeyboardEvent) {
    console.log('keyboard');
  }

}
