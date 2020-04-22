import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SearchRoutingModule } from './search-routing.module';
import { SearchMaterialModule } from '../_common/material/search-material.module';
import { LoadingBoxComponentModule } from '../_common/modules/loading-box-component.module';
import { MoreDetailsComponentModule } from '../_common/modules/more-details-component.module';
import { ArrayFilterPipeModule } from '../_common/modules/array-filter-pipe.module';
import { AnimeDatePipeModule } from '../_common/modules/anime-date-pipe.module';
import { SliceStringPipeModule } from '../_common/modules/slice-string-pipe.module';
import { TiltDirectiveModule } from '../_common/modules/tilt-directive.module';
import { MediaDetailsDirectiveModule } from '../_common/modules/media-details-directive.module';

import { SearchComponent } from './search.component';
import { SeasonYearComponent } from '../_components/season-year/season-year.component';
import { SearchChipsComponent } from '../_components/search-chips/search-chips.component';
import { FixSearchChipsPipe } from '../_common/pipes/fix-search-chips.pipe';
import { FilterNsfwPipe } from '../_common/pipes/filter-nsfw.pipe';


@NgModule({
  declarations: [
    SearchComponent,
    SeasonYearComponent,
    SearchChipsComponent,
    FixSearchChipsPipe,
    FilterNsfwPipe
  ],
  entryComponents: [
    SeasonYearComponent,
    SearchChipsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SearchRoutingModule,
    SearchMaterialModule,
    LoadingBoxComponentModule,
    MoreDetailsComponentModule,
    ArrayFilterPipeModule,
    AnimeDatePipeModule,
    SliceStringPipeModule,
    TiltDirectiveModule,
    MediaDetailsDirectiveModule,

    LazyLoadImageModule
  ]
})
export class SearchModule { }
