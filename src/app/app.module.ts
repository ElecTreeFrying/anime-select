import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MdCoreModule } from './common/md/md-core.module';
import { AppComponent } from './app.component';
import { PiratesModalComponent } from './common/shared/components/pirates-modal/pirates-modal.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    PiratesModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MdCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PiratesModalComponent
  ]
})
export class AppModule { }
