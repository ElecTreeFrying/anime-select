import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteRoutingModule } from './autocomplete-routing.module';
import { Material2Module } from '../../common/core/modules/material2.module';

import { AutocompleteComponent } from './autocomplete.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteRoutingModule,
    Material2Module
  ],
  declarations: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }
