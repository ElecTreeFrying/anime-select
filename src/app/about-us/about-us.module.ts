import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsMaterialModule } from '../_common/material/about-us-material.module';

import { AboutUsComponent } from './about-us.component';


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    AboutUsMaterialModule
  ]
})
export class AboutUsModule { }
