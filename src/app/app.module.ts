import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './_common/material/app-material.module';
import { LoadingBoxComponentModule } from './_common/modules/loading-box-component.module';

import { AppComponent } from './app.component';
import { AboutComponent } from './_components/about/about.component';
import { ScrollTopDirective } from './_common/directives/scroll-top.directive';
import { RelationshipPipe } from './_common/pipes/relationship.pipe';
import { StringHelperPipe } from './_common/pipes/string-helper.pipe';
import { LoadMorePipe } from './_common/pipes/load-more.pipe';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ScrollTopDirective,
    RelationshipPipe,
    StringHelperPipe,
    LoadMorePipe
  ],
  entryComponents: [
    AboutComponent,
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    LoadingBoxComponentModule,

    SnotifyModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
