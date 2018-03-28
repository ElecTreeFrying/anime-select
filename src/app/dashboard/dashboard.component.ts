import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ShortenPipe } from 'ngx-pipes';
import * as _ from 'lodash';

import { PiratesService } from '../common/core/services/pirates.service';
import { SharedService } from '../common/core/services/shared.service';

import { LearnMoreDialogComponent } from '../common/shared/components/learn-more-dialog/learn-more-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  learnMoreDialogComponentRef: MatDialogRef<LearnMoreDialogComponent>;

  reactivePirates: any;

  pirates: any[] = [];
  counter: number = 0;
  isShow: boolean = true;
  isShowFab: boolean = false;
  isShowAutocomplete: number = 0;
  isLoadAutocomplete: boolean = true;
  smoothScrollbar: any = undefined;

  getPirates: Subscription;
  autocompleteChanged: Subscription;
  piratesChanged: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private dialog: MatDialog, private piratesService: PiratesService, private sharedService: SharedService) { }

  ngOnInit() {

    this.route.queryParams.subscribe((response) => {
      this.piratesService.getPirates(`${405}`).subscribe((response) => this.pirates = response['data']);
      this.router.navigateByData({
        url: ['dashboard', 'u1'],
        data: null,
        extras: {
          queryParams: { refresh: false },
          skipLocationChange: true,
          queryParamsHandling: 'merge'
        }
      });
    });

    this.isLoadAutocomplete = true;
    setTimeout(() => this.isLoadAutocomplete = false, 300);

    this.counter = 420;

    setTimeout(() => {
      this.piratesService.getPirates(`${405}`).subscribe((response) => this.pirates = response['data']);
    }, 300);

    this.router.navigateByData({
      url: ['u1'],
      data: null,
      extras: {
        queryParamsHandling: 'merge',
        relativeTo: this.route
      }
    });

    this.sharedService.autocompleteChanged.subscribe((response) => {
      setTimeout(() => this.isShowAutocomplete = this.sharedService.autocompleteChanged.observers.length, 50);
    });

    this.sharedService.piratesChanged.subscribe((response) => {
      setTimeout(() => { if (response.length < 375) this.pirates = response }, 150);
    });

  }

  ngAfterViewInit() {
    this.smoothScrollbar = this.sharedService.initScrollbar();
    this.smoothScrollbar[0].addListener((status) => {
      if (status.limit.y === status.offset.y) {
        setTimeout(() => this.onScroll(), 300);
      }
    });
  }

  ngOnDestroy() {
    if (this.getPirates !== undefined)          this.getPirates.unsubscribe();
    if (this.autocompleteChanged !== undefined) this.autocompleteChanged.unsubscribe();
    if (this.piratesChanged !== undefined)      this.piratesChanged.unsubscribe();
  }

  onScroll() {
    if (this.counter <= 880 ) {
      this.piratesService.getPirates(`${this.counter}`).subscribe((response) => {
        this.pirates = this.pirates.concat(response['data']);
        this.pirates = _.uniqWith(this.pirates, _.isEqual);
        this.counter = this.counter + 20;
      });
    } else this.isShow = false;
  }


  onDialog(pirate: any) {
    this.dialog.open(LearnMoreDialogComponent, {
      data: {
        id: pirate['id'],
        attributes: pirate['attributes'],
        relationships: pirate['relationships']
      }
    });
  }

}
