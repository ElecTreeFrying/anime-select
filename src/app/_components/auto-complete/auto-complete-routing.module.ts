import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoCompleteComponent } from './auto-complete.component';

const routes: Routes = [
  { path: '', component: AutoCompleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoCompleteRoutingModule { }
