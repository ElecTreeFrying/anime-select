import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaModule } from './media/media.module';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'media/:slugName/:id/:status', loadChildren: './media/media.module#MediaModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
