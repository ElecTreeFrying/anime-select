import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbacksComponent } from './feedbacks.component';

const routes: Routes = [
  { path: '', component: FeedbacksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbacksRoutingModule { }
