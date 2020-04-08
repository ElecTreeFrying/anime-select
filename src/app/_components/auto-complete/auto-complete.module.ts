import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteRoutingModule } from './auto-complete-routing.module';
import { AutoCompleteComponent } from './auto-complete.component';


@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    CommonModule,
    AutoCompleteRoutingModule
  ]
})
export class AutoCompleteModule { }
