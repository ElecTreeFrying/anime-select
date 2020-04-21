import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SelectRoutingModule } from './select-routing.module';
import { SelectMaterialModule } from '../_common/material/select-material.module';
import { LoadingBoxComponentModule } from '../_common/modules/loading-box-component.module';
import { MoreDetailsComponentModule } from '../_common/modules/more-details-component.module';
import { IdToImagePipeModule } from '../_common/modules/id-to-image-pipe.module';
import { TiltDirectiveModule } from '../_common/modules/tilt-directive.module';
import { MediaDetailsDirectiveModule } from '../_common/modules/media-details-directive.module';

import { SelectComponent } from './select.component';


@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    SelectRoutingModule,
    SelectMaterialModule,
    LoadingBoxComponentModule,
    MoreDetailsComponentModule,
    IdToImagePipeModule,
    TiltDirectiveModule,
    MediaDetailsDirectiveModule
  ]
})
export class SelectModule { }
