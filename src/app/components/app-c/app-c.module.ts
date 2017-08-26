import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdModule } from '../../common/md/md.module';

import { AppCRoutingModule } from './app-c-routing.module';
import { AppCComponent } from './app-c.component';

import { PirateDetailsComponent } from './pirate-details/pirate-details.component';

@NgModule({
  imports: [
    CommonModule,
    MdModule,
    AppCRoutingModule
  ],
  declarations: [
    AppCComponent,
    PirateDetailsComponent
  ]
})
export class AppCModule { }
