import { Directive, HostListener, Input } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Directive({
  selector: '[tilt]'
})
export class TiltDirective {
  
  @Input() tilt: HTMLElement;

  constructor() { }

  @HostListener('mouseover', [ '$event' ])
  animate() {
    VanillaTilt.init(this.tilt, {
      scale: 1.1,
      glare: true,
      "max-glare": 0.5
    });
  }

}
