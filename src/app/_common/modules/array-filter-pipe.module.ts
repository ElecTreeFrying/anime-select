import { NgModule } from '@angular/core';

import { ArrayFilterPipe } from '../pipes/array-filter.pipe';


@NgModule({
  declarations: [
    ArrayFilterPipe
  ],
  exports: [
    ArrayFilterPipe
  ]
})
export class ArrayFilterPipeModule { }
