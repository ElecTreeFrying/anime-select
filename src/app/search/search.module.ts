import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SearchRoutingModule } from './search-routing.module';
import { SearchMaterialModule } from '../_common/material/search-material.module';
import { LoadingBoxComponentModule } from '../_common/modules/loading-box-component.module';
import { ArrayFilterPipeModule } from '../_common/modules/array-filter-pipe.module';
import { TiltDirectiveModule } from '../_common/modules/tilt-directive.module';
import { CardDetailsDirectiveModule } from '../_common/modules/card-details-directive.module';

import { SearchComponent } from './search.component';
import { SeasonYearComponent } from '../_components/season-year/season-year.component';


@NgModule({
  declarations: [
    SearchComponent,
    SeasonYearComponent
  ],
  entryComponents: [
    SeasonYearComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SearchRoutingModule,
    SearchMaterialModule,
    LoadingBoxComponentModule,
    ArrayFilterPipeModule,
    TiltDirectiveModule,
    CardDetailsDirectiveModule,

    LazyLoadImageModule
  ]
})
export class SearchModule { }
