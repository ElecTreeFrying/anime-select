import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersMaterialModule } from '../_common/material/characters-material.module';

import { CharactersComponent } from './characters.component';
import { IdToImagePipe } from '../_common/pipes/id-to-image.pipe';

@NgModule({
  declarations: [
    CharactersComponent,
    IdToImagePipe
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    CharactersMaterialModule
  ]
})
export class CharactersModule { }
