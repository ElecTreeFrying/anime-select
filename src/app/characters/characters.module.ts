import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersMaterialModule } from '../_common/material/characters-material.module';
import { LoadingBoxComponentModule } from '../_common/modules/loading-box-component.module';

import { CharactersComponent } from './characters.component';
import { CharacterComponent } from '../_components/character/character.component';
import { IdToImagePipe } from '../_common/pipes/id-to-image.pipe';
import { SliceStringPipe } from '../_common/pipes/slice-string.pipe';
import { FilterSubtypePipe } from '../_common/pipes/filter-subtype.pipe';
import { TiltDirective } from '../_common/directives/tilt.directive';

@NgModule({
  declarations: [
    CharactersComponent,
    CharacterComponent,
    IdToImagePipe,
    SliceStringPipe,
    FilterSubtypePipe,
    TiltDirective
  ],
  entryComponents: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    CharactersMaterialModule,
    LoadingBoxComponentModule
  ]
})
export class CharactersModule { }
