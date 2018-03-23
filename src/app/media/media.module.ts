import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';

@NgModule({
  imports: [
    CommonModule,
    MediaRoutingModule
  ],
  declarations: [MediaComponent]
})
export class MediaModule { }
