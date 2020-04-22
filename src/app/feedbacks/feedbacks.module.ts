import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FeedbacksRoutingModule } from './feedbacks-routing.module';
import { FeedbacksMaterialModule } from '../_common/material/feedbacks-material.module';

import { FeedbacksComponent } from './feedbacks.component';


@NgModule({
  declarations: [
    FeedbacksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeedbacksRoutingModule,
    FeedbacksMaterialModule
  ]
})
export class FeedbacksModule { }
