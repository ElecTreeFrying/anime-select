import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { Material2Module } from '../common/core/modules/material2.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { DashboardComponent } from './dashboard.component';
import { PiratesSpinnerComponent } from './pirates-spinner/pirates-spinner.component';
import { LearnMoreDialogComponent } from '../common/shared/components/learn-more-dialog/learn-more-dialog.component';

import { PiratesService } from '../common/core/services/pirates.service';
import { SharedService } from '../common/core/services/shared.service';
import { DashboardResolver } from './dashboard.resolver';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Material2Module,
    InfiniteScrollModule
  ],
  declarations: [
    DashboardComponent,
    PiratesSpinnerComponent,
    LearnMoreDialogComponent,
  ],
  providers: [
    PiratesService,
    SharedService,
    DashboardResolver,
  ],
  entryComponents: [
    LearnMoreDialogComponent
  ]
})
export class DashboardModule { }
