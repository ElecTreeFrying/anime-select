import { NgModule } from '@angular/core';

import { IdToImagePipe } from '../pipes/id-to-image.pipe';


@NgModule({
  declarations: [
    IdToImagePipe
  ],
  exports: [
    IdToImagePipe
  ]
})
export class IdToImagePipeModule { }
