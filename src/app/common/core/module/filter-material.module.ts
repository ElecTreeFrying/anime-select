import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
  ]
})
export class FilterMaterialModule { }
