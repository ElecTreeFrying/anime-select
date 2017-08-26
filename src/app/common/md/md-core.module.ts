import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class MdCoreModule { }
