import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PiratesRoutingModule } from './pirates-routing.module';
import { PiratesMaterialModule } from '../common/core/module/pirates-material.module';

import { PiratesComponent } from './pirates.component';

import { HttpService } from '../common/core/service/http.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PiratesRoutingModule,
    PiratesMaterialModule
  ],
  declarations: [
    PiratesComponent
  ],
  providers: [
    HttpService
  ]
})
export class PiratesModule { }
