import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  exports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,

    ScrollingModule
  ]
})
export class CharactersMaterialModule { }
