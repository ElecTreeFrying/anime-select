import { NgModule } from '@angular/core';

import { TiltDirective } from '../directives/tilt.directive';


@NgModule({
  declarations: [
    TiltDirective
  ],
  exports: [
    TiltDirective
  ]
})
export class TiltDirectiveModule { }
