import { NgModule } from '@angular/core';

import { CardDetailsDirective } from '../directives/card-details.directive';


@NgModule({
  declarations: [
    CardDetailsDirective
  ],
  exports: [
    CardDetailsDirective
  ]
})
export class CardDetailsDirectiveModule { }
