import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../common/md/md.module';
import { PiratesRoutingModule } from './pirates-routing.module';

import { PiratesComponent } from './pirates.component';
import { PiratesSpinnerComponent } from './pirates-spinner/pirates-spinner.component';
import { PiratesEndRowComponent } from './pirates-end-row/pirates-end-row.component';

import { ShortenPipe } from '../../../common/shared/pipes/shorten.pipe';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    MdModule,
    PiratesRoutingModule
  ],
  declarations: [
    PiratesComponent,
    PiratesSpinnerComponent,
    PiratesEndRowComponent,
    ShortenPipe,
  ],
})
export class PiratesModule { }
