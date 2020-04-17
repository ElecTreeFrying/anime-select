import { NgModule } from '@angular/core';

import { AnimeDatePipe } from '../pipes/anime-date.pipe';


@NgModule({
  declarations: [
    AnimeDatePipe
  ],
  exports: [
    AnimeDatePipe
  ]
})
export class AnimeDatePipeModule { }
