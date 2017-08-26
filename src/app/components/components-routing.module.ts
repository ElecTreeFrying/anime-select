import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { RoutePageComponent } from './route-page/route-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: ComponentsComponent, children: [
    { path: '', component: RoutePageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'app-c', loadChildren: './app-c/app-c.module#AppCModule' },
    { path: 'contact', component: ContactComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
