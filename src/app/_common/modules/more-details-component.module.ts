import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliceStringPipeModule } from './slice-string-pipe.module';
import { AnimeDatePipeModule } from './anime-date-pipe.module';

import { MoreDetailsComponent } from '../../_components/more-details/more-details.component';


@NgModule({
  declarations: [
    MoreDetailsComponent
  ],
  imports: [
    CommonModule,
    AnimeDatePipeModule,
    SliceStringPipeModule,
  ],
  exports: [
    MoreDetailsComponent
  ]
})
export class MoreDetailsComponentModule { }
