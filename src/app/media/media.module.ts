import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { Material2Module } from '../common/core/modules/material2.module';

import { MediaComponent } from './media.component';


@NgModule({
  imports: [
    CommonModule,
    MediaRoutingModule,
    Material2Module
  ],
  declarations: [
    MediaComponent
  ]
})
export class MediaModule { }
