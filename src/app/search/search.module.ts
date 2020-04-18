import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SearchRoutingModule } from './search-routing.module';
import { SearchMaterialModule } from '../_common/material/search-material.module';
import { LoadingBoxComponentModule } from '../_common/modules/loading-box-component.module';
import { TiltDirectiveModule } from '../_common/modules/tilt-directive.module';
import { CardDetailsDirectiveModule } from '../_common/modules/card-details-directive.module';

import { ArrayFilterPipe } from '../_common/pipes/array-filter.pipe';

import { SearchComponent } from './search.component';


@NgModule({
  declarations: [
    SearchComponent,
    ArrayFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SearchMaterialModule,
    LoadingBoxComponentModule,
    TiltDirectiveModule,
    CardDetailsDirectiveModule,

    LazyLoadImageModule
  ]
})
export class SearchModule { }
