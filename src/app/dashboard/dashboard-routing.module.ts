import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { DashboardResolver } from './dashboard.resolver';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'u1', loadChildren: './autocomplete/autocomplete.module#AutocompleteModule', resolve: [ DashboardResolver ] },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
