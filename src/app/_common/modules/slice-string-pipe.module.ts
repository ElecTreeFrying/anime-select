import { NgModule } from '@angular/core';

import { SliceStringPipe } from '../pipes/slice-string.pipe';


@NgModule({
  declarations: [
    SliceStringPipe
  ],
  exports: [
    SliceStringPipe
  ]
})
export class SliceStringPipeModule { }
