import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { MdModule } from '../common/md/md.module';

import { ComponentsComponent } from './components.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { RoutePageComponent } from './route-page/route-page.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MdModule
  ],
  declarations: [
    ComponentsComponent,
    ContactComponent,
    AboutComponent,
    RoutePageComponent
  ]
})
export class ComponentsModule { }
