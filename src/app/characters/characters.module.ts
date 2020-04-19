import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersMaterialModule } from '../_common/material/characters-material.module';
import { LoadingBoxComponentModule } from '../_common/modules/loading-box-component.module';
import { IdToImagePipeModule } from '../_common/modules/id-to-image-pipe.module';
import { SliceStringPipeModule } from '../_common/modules/slice-string-pipe.module';
import { AnimeDatePipeModule } from '../_common/modules/anime-date-pipe.module';
import { ArrayFilterPipeModule } from '../_common/modules/array-filter-pipe.module';
import { TiltDirectiveModule } from '../_common/modules/tilt-directive.module';

import { CharactersComponent } from './characters.component';
import { CharacterComponent } from '../_components/character/character.component';
import { FilterSubtypePipe } from '../_common/pipes/filter-subtype.pipe';

@NgModule({
  declarations: [
    CharactersComponent,
    CharacterComponent,
    FilterSubtypePipe
  ],
  entryComponents: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    CharactersMaterialModule,
    LoadingBoxComponentModule,
    IdToImagePipeModule,
    SliceStringPipeModule,
    AnimeDatePipeModule,
    ArrayFilterPipeModule,
    TiltDirectiveModule,

    LazyLoadImageModule
  ]
})
export class CharactersModule { }
