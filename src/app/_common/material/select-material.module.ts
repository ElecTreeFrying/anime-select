import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  exports: [
    MatCardModule,
    MatRippleModule,
    MatDividerModule,
    MatIconModule,
  ]
})
export class SelectMaterialModule { }
