import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppCComponent } from './app-c.component';
import { PirateDetailsComponent } from './pirate-details/pirate-details.component';

const routes: Routes = [
  { path: '', component: AppCComponent, children: [
    { path: 'characters', loadChildren: './pirates/pirates.module#PiratesModule' },
    { path: 'character-details', component: PirateDetailsComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCRoutingModule { }
