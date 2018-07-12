import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';

import { AppMaterialModule } from './common/core/module/app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { SharedService } from './common/core/service/shared.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    SharedService
  ]
})
export class AppModule { }
