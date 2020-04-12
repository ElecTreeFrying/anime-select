import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import easyScroll from 'easy-scroll';

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

  isScrolling: boolean;
  isLoadingAll: boolean;
  isLoading: boolean;
  isRunning: boolean;
  isShow: boolean;
  exists: boolean;
  count: number;
  maxScroll: number;
  scrollValue: number;

  constructor(
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private api: ApiService,
    private shared: SharedService,
    private snotify: SnotifyService
  ) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('../assets/onepiece.svg'));
  }

  ngOnInit() {
    this.isScrolling = false;
    this.isLoadingAll = false;
    this.isLoading = false;
    this.isRunning = false;
    this.isShow = false;
    this.exists = false;
    this.count = 0;

    this.shared.loadCancel.subscribe((res) => {
      if (!res) return;
      this.isRunning = false;
      this.isLoadingAll = false;
    });
  }

  ngAfterViewInit() {

    this.scroll.elementScrolled().subscribe((res: Event) => {
      const target = <HTMLElement>res.target;
      const maxScroll = target.scrollHeight - target.clientHeight;
      const scrollValue = target.scrollTop;
      this.scrollValue = scrollValue;

      if (scrollValue === 0) {
        this.isScrolling = true;
      } else {
        this.isScrolling = false;
      } 
      
      if (scrollValue > 170) {
        this.isShow = true;
        this.cd.detectChanges();
      } 
      
      if (scrollValue === maxScroll && this.exists && !this.isLoadingAll) {
        this.loadCharacters();
      }

      if (scrollValue === maxScroll && this.count === 25) {
        this.isLoading = false;
      }

      if (scrollValue < (maxScroll - 185)) {
        this.isLoading = false;
      } else if (scrollValue > (maxScroll - 185) && this.count !== 25 && !this.exists) {
        this.isLoading = true;
        this.cd.detectChanges();
        this.exists ? this.scroll.scrollTo({ bottom: 0 }) : 0;
      }

    });    
  }

  reveal(emit: any) {

    if (typeof emit === 'number') {

      this.isScrolling = false
      return;
    }

    this.isShow = emit;
    this.cd.detectChanges();
  }

  scrollTo(option: boolean) {
    if (this.isScrolling) return;

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

  refresh() {
    if (this.isLoadingAll) return;

    this.count = 0;
    this.isLoadingAll = false;
    this.scroll.scrollTo({ top: 0 });
    this.api.updatedDataSelection(false, 0);
    this.shared.updatedTriggerRefreshSelection = false;
    this.snotify.refreshCharactersNotify();
  }

  loadAll() {
    if (this.isRunning && this.count !== 25) return;

    if (!this.isRunning && this.count === 25) {
      this.snotify._notify('All characters has been loaded.', 'simple');
    }

    if (!this.isLoadingAll && !this.isRunning && this.count !== 25) {
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
      }, (25 - this.count) * 500);
    } 
  }

  loadCharacters() {
    this.api.updatedDataSelection(this.count < 24);
    this.count++;
  }

}
