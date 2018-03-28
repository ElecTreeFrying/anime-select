import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { Material2Module } from '../common/core/modules/material2.module';
import { NgPipesModule } from 'ngx-pipes';

import { DashboardComponent } from './dashboard.component';
import { PiratesSpinnerComponent } from './pirates-spinner/pirates-spinner.component';
import { LearnMoreDialogComponent } from '../common/shared/components/learn-more-dialog/learn-more-dialog.component';
import { OtherMediaComponent } from '../common/shared/components/learn-more-dialog/other-media/other-media.component';

import { PiratesService } from '../common/core/services/pirates.service';
import { SharedService } from '../common/core/services/shared.service';
import { DashboardResolver } from './dashboard.resolver';
import { MediaComponent } from '../common/shared/components/media/media.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Material2Module,
    NgPipesModule,
  ],
  declarations: [
    DashboardComponent,
    PiratesSpinnerComponent,
    LearnMoreDialogComponent,
    OtherMediaComponent,
    MediaComponent,
  ],
  providers: [
    PiratesService,
    SharedService,
    DashboardResolver,
  ],
  entryComponents: [
    LearnMoreDialogComponent,
    OtherMediaComponent,
    MediaComponent,
  ]
})
export class DashboardModule { }
