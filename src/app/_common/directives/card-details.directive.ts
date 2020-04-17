import { Directive, HostListener, Input } from '@angular/core';
import { SnotifyPosition } from 'ng-snotify';

import { SnotifyService } from '../services/snotify.service';

@Directive({
  selector: '[cardDetails]'
})
export class CardDetailsDirective {

  @Input() cardDetails: any;

  constructor(
    private snotify: SnotifyService
  ) { }

  @HostListener('mouseover', [ '$event' ])
  show() {
    this.snotify.clear();
    this.snotify._notify(this.cardDetails.canonicalTitle, 'simple', {
      position: SnotifyPosition.leftTop,
      closeOnClick: true
    })

  }

}
