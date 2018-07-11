import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterRoutingModule } from './filter-routing.module';
import { FilterMaterialModule } from '../common/core/module/filter-material.module';

import { FilterComponent } from './filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterRoutingModule,
    FilterMaterialModule
  ],
  declarations: [
    FilterComponent
  ]
})
export class FilterModule { }
