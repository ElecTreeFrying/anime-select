import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class FilterMaterialModule { }
