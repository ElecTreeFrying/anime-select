import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { Material2Module } from './common/core/modules/material2.module';
import { NgPipesModule } from 'ngx-pipes';
import 'angular2-navigate-with-data';

import { AppComponent } from './app.component';

import { SharedService } from './common/core/services/shared.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    Material2Module,
    NgPipesModule,
  ],
  providers: [
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
