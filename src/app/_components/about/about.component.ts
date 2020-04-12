import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnotifyPosition } from 'ng-snotify';
import Simplebar from 'simplebar';

import { SharedService, ABOUT } from '../../_common/services/shared.service';
import { SnotifyService } from '../../_common/services/snotify.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('simplebar') public simplebar: ElementRef;
  
  _simplebar: any;

  _item: Subscription
  about: any;
  episode: any;
  isEpisode: boolean

  episodeCount: number;
  isEpisodeOpen: boolean;
  staffCount: number;
  isStaffOpen: boolean;

  constructor(
    private shared: SharedService,
    private snotify: SnotifyService
  ) { }

  ngOnInit(): void {
    this.about = ABOUT;
    this.isEpisode = false;
    this.episodeCount = -1;
    this.staffCount = -1;
  }

  ngAfterViewInit() {
    this._simplebar = new Simplebar(this.simplebar.nativeElement)
  }

  ngOnDestroy() {
    if (!this._item) return;
    this._item.unsubscribe()
  }

  moreEpisode(option: boolean) {

    setTimeout(() => {
      this._simplebar.getScrollElement().scrollTo(0, this._simplebar.el.scrollHeight * 1000);
    }, 250);

    const highest = this.shared.episodePrev.length;
    const lowest = 10;
    const increment = 100;
    const highestValid = Math.floor(highest/increment)*increment;
    
    if (option && (this.episodeCount !== -1) && (this.episodeCount < highestValid)) {
      this.episodeCount = this.episodeCount === lowest ? increment : (this.episodeCount + increment); return; }
    
    if (option && (this.episodeCount >= highestValid) && (this.episodeCount !== highest)) {
      this.episodeCount = highest; return; }
    
    if (!option && (this.episodeCount === highest)) {
      this.episodeCount = highestValid; return; }
    
    if (!option && this.episodeCount === increment) {
      this.episodeCount = lowest; return; }
    
    if (!option && this.episodeCount > (increment - 1) && (this.episodeCount !== -1)) {
      this.episodeCount = this.episodeCount - increment; return; }
    
    if (option && (this.episodeCount === -1)) {
      this.episodeCount = increment; return; }
  }

  moreStaff(option: boolean) {

    setTimeout(() => {
      this._simplebar.getScrollElement().scrollTo(0, this._simplebar.el.scrollHeight * 1000);
    }, 250);

    const highest = this.shared.staffPrev.length;
    const lowest = 5;
    const increment = 10;
    const highestValid = Math.floor(highest/increment)*increment;

    if (option && (this.staffCount !== -1) && (this.staffCount < highestValid)) {
      this.staffCount = this.staffCount === lowest ? increment : (this.staffCount + increment); return; }
    
    if (option && (this.staffCount >= highestValid) && (this.staffCount !== highest)) {
      this.staffCount = highest; return; }
    
    if (!option && (this.staffCount === highest)) {
      this.staffCount = highestValid; return; }
    
    if (!option && this.staffCount === increment) {
      this.staffCount = lowest; return; }
    
    if (!option && this.staffCount > (increment - 1) && (this.staffCount !== -1)) {
      this.staffCount = this.staffCount - increment; return; }
    
    if (option && (this.staffCount === -1)) {
      this.staffCount = increment; return; }
  }

  resetLoadMore(option: boolean = false) {
    this.episodeCount = -1; 
    this.staffCount = -1; 
    this.isEpisodeOpen = option;
    this.isStaffOpen = option;
  }

  openEpisode(episode: any) {
    this.episode = episode;
    this.isEpisode = true;
  }

  _category(item: any) {
    this._item = item.subscribe((res) => {

      this.snotify._notify(res.description, 'simple', {
        bodyMaxLength: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        position: SnotifyPosition.leftTop,
        showProgressBar: true,
        timeout: 5000
      }, res.title)
    });
  }

}