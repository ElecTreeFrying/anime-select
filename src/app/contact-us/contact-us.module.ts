import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsMaterialModule } from '../_common/material/contact-us-material.module';

import { ContactUsComponent } from './contact-us.component';


@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactUsRoutingModule,
    ContactUsMaterialModule
  ]
})
export class ContactUsModule { }
