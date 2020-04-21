import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import easyScroll from 'easy-scroll';

import { AboutComponent } from './_components/about/about.component';

import { ApiService } from './_common/services/api.service';
import { SharedService } from './_common/services/shared.service';
import { SnotifyService } from './_common/services/snotify.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('scroll') scroll: CdkScrollable;
  @ViewChild('toolbar') toolbar: MatToolbar;

  toolbarHeight: number;
  isScrolling: boolean;
  isLoadingAll: boolean;
  isLoading: boolean;
  isRunning: boolean;
  isShowScrollTop: boolean;
  isShowLoadMore: boolean;
  exists: boolean;
  isMenuOpened: boolean;
  isSelectRoute: string;
  isMaxCharacters: boolean;
  isFooterPage: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private api: ApiService,
    public shared: SharedService,
    private snotify: SnotifyService
  ) { }

  private normalize() {
    this.toolbarHeight = 64;
    this.isScrolling = false;
    this.isLoadingAll = false;
    this.isLoading = false;
    this.isRunning = false;
    this.isShowScrollTop = false;
    this.exists = false;
    this.isMenuOpened = false;
    this.isSelectRoute = 'select';
    this.isMaxCharacters = false;
    this.isFooterPage = false;

    this.shared.count = 0;
  }

  ngOnInit() {
    this.normalize();

    this.shared.loadCancel.subscribe((res) => {
      if (!res) return;
      this.isRunning = false;
      this.isLoadingAll = false;
    });

    this.shared.loadMore.subscribe((res) => {
      if (res === 2) {
        this.isShowLoadMore = true;
      } else if (res === -1) {
        this.isShowLoadMore = false;
      } else if (res === 55) {
        this.isMaxCharacters = false;
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  ngAfterViewInit() {

    this.toolbarHeight = this.toolbar._elementRef.nativeElement.clientHeight;

    this.shared.navigating.subscribe((res: number) => {
      res === 0 ? this.scroll.scrollTo({ top: 0 }) : 0;
      res === 2 ? (this.isMaxCharacters = false) : 0;
    });

    this.shared.selectRoute.subscribe((res: any) => {
      this.isSelectRoute = res;
      this.isMaxCharacters = true;
      this.isFooterPage = res === 'about' || res === 'contact' || res === 'report-issue';
      res === 'loop' ? (this.isMaxCharacters = false) : 0;
      this.cd.detectChanges();

      if (!this.isFooterPage) return;
      this.scroll.scrollTo({ top: 0 });
    });

    this.scroll.elementScrolled().subscribe((res: Event) => {
      const target = <HTMLElement>res.target;
      const maxScroll = target.scrollHeight - target.clientHeight;
      let scrollValue = target.scrollTop;

      if (scrollValue < maxScroll) {
        scrollValue = Math.ceil(scrollValue);
      } else if (scrollValue === maxScroll) {
        scrollValue = target.scrollTop;
      } else {
        scrollValue = Math.floor(scrollValue);
      }

      if (scrollValue === 0) {
        this.isScrolling = true;
        this.isLoading = false;
        this.isShowScrollTop = false;
      } else {
        this.isScrolling = false;
      }

      if (scrollValue > 170) {
        this.isShowScrollTop = true;
      }

      if (scrollValue === maxScroll && this.exists && !this.isLoadingAll) {
        if (this.shared.count + 1 === this.shared.ceil || this.shared.count === this.shared.ceil) {
          this.isMaxCharacters = true;
          this.shared.updatedSelectRouteSSelection = ''
          return;
        };
        this.loadCharacters();
      }

      if (scrollValue < (maxScroll - 185 - 200)) {
        if (!this.isLoading) return;
        this.isLoading = false;
        this.cd.detectChanges();
      }

      if (scrollValue > (maxScroll - 200)) {
        if (this.isLoading) return;
        this.isLoading = true;
        this.cd.detectChanges();
        if (
          this.isSelectRoute === 'search' ||
          this.isSelectRoute === 'about' ||
          this.isSelectRoute === 'contact' ||
          this.isSelectRoute === 'report-issue' ||
          this.shared.mediaCharacters.length < 20
        ) return;
        this.shared.count !== this.shared.ceil ? this.scroll.scrollTo({ bottom: 0 }) : 0;
      }
    });
  }

  reveal(emit: any) {

    if (typeof emit === 'number') {

      this.isScrolling = false;
      return;
    }

    this.isShowScrollTop = emit;
    this.cd.detectChanges();
  }

  scrollTo(option: boolean) {
    if (this.isScrolling && this.isSelectRoute !== 'search') return;

    this.isScrolling = true;
    easyScroll({
      'scrollableDomEle': this.scroll.getElementRef().nativeElement,
      'easingPreset': 'easeInOutQuint',
      'direction': option ? 'top' : 'bottom',
      'duration': 3000,
      'onAnimationCompleteCallback': () => {
        this.isScrolling = false;
        option ? 0 : this.scroll.scrollTo({ bottom: 0 });
      }
    });
  }

  loadMore() {
    this.snotify.loadNotify();
    this.shared.updatedLoadMoreSelection = 1;
    this.shared.updatedLoadingMoreSelection = 1;
  }

  refresh() {

    if (this.isSelectRoute === 'search') {
      return this.shared.updatedResetSourceSelection = 1;
    }

    if (this.isLoadingAll || this.shared.mediaCharacters.length < 20) return;

    this.shared.count = 0;
    this.isLoadingAll = false;
    this.scroll.scrollTo({ top: 0 });
    this.api.updatedDataSelection(false);
    this.snotify.refreshCharactersNotify();
    this.shared.updatedTriggerRefreshSelection = false;
  }

  loadAll() {

    if (this.shared.mediaCharacters.length < 20) return;

    if (this.isRunning && this.shared.count !== this.shared.ceil) return;

    if (!this.isRunning && this.shared.count === this.shared.ceil) {
      return this.snotify._notify('All characters has been loaded.', 'simple');
    }

    if (!this.isLoadingAll && !this.isRunning && this.shared.count !== this.shared.ceil) {

      this.snotify.loadAllCharactersNotify();

      this.isLoadingAll = true;
      this.shared.interval = setInterval(() => {
        this.isRunning = true;
        this.loadCharacters();
      }, 500);

      this.shared.timeout = setTimeout(() => {
        clearInterval(this.shared.interval);
        this.isRunning = false;
        this.isLoadingAll = false;
      }, (this.shared.ceil - this.shared.count) * 500);
    }
  }

  about() {
    this.dialog.open(AboutComponent, {
      closeOnNavigation: true,
      autoFocus: false,
      hasBackdrop: true
    });
  }

  loadCharacters() {
    this.api.updatedDataSelection(true);
    this.shared.count++;
  }

  get anime() {
    return this.router.url.includes('characters');
  }

}
