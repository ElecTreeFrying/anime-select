import { NgModule } from '@angular/core';

import { MediaDetailsDirective } from '../directives/media-details.directive';


@NgModule({
  declarations: [
    MediaDetailsDirective
  ],
  exports: [
    MediaDetailsDirective
  ]
})
export class MediaDetailsDirectiveModule { }
