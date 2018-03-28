import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatIconRegistry } from '@angular/material';
import { Platform } from '@angular/cdk/platform';

import { SharedService } from './common/core/services/shared.service';

import { NoticeComponent } from './common/shared/components/notice/notice.component';
import { ShowDetailsComponent } from './common/shared/components/show-details/show-details.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  noticeComponent: MatDialogRef<NoticeComponent>;
  isShowFab: boolean = false;
  statusOffset: number;
  smoothScrollbar: any = undefined;

  constructor(private router: Router, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private route: ActivatedRoute, private dialog: MatDialog, private platform: Platform, private sharedService: SharedService) {
    iconRegistry.addSvgIcon('one_piece', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/One_Piece_symbol.svg'));
    iconRegistry.addSvgIcon('one_piece2', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/Strawhat_crew_jolly_roger.svg'));
  }

  ngOnInit() {
    this.statusOffset = 0;
    this.router.navigateByData({
      url: ['dashboard'],
      data: null,
      extras: {
        queryParams: { refresh: false }
      }
    });

    if ((this.platform.ANDROID && this.platform.isBrowser)
        || (this.platform.IOS && this.platform.isBrowser)
        || (this.platform.IOS && this.platform.SAFARI)
        || this.platform.ANDROID
        || this.platform.IOS) {
      this.noticeComponent = this.dialog.open(NoticeComponent);
    }
  }

  ngAfterViewInit() {
    this.smoothScrollbar = this.sharedService.initScrollbar();
    this.smoothScrollbar[0].addListener((status) => {
      this.statusOffset = +status.offset.y;
      setTimeout(() => {
        this.isShowFab = +status.offset.y > 120 ? true : false;
      }, 350);
    });
  }

  onScrollTop() {
    this.smoothScrollbar[0].scrollTop = 0;
  }

  onRefreshList() {
    this.smoothScrollbar[0].scrollTop = 0;
    this.router.navigateByData({
      url: ['dashboard', 'u1'],
      data: null,
      extras: {
        queryParams: { refresh: true },
        skipLocationChange: true,
        queryParamsHandling: 'merge'
      }
    });
  }

  displayDetails() {
    this.dialog.open(ShowDetailsComponent);
  }

}
