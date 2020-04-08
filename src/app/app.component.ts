import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';

import { ApiService } from './_common/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('scroll') scroll: CdkScrollable;

  isLoadingAll: boolean;
  isLoading: boolean;
  exists: boolean = false;
  count: number = 0;

  constructor(
    private cd: ChangeDetectorRef,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.isLoadingAll = false;
    this.isLoading = false;
  }

  ngAfterViewInit() {
    
    this.scroll.elementScrolled().subscribe((res: Event) => {
      const target = <HTMLElement>res.target;
      const maxScroll = target.scrollHeight - target.clientHeight;
      const scrollValue = target.scrollTop;
      
      if (scrollValue === maxScroll && this.exists && !this.isLoadingAll) {
        this.loadCharacters();
      }

      if (scrollValue === maxScroll && !this.isLoadingAll) {

        this.isLoading = this.count < 25;
        this.cd.detectChanges();
        this.scroll.scrollTo({ bottom: 0 });
      } 
    });
  }

  refresh() {
    if (this.isLoadingAll) {
      console.log('please wait until all characters are loaded');
      return;
    } else {
      this.isLoadingAll = false;
      this.api.updatedDataSelection(false, 0);
      console.log('characters refreshed !');
    }

  }

  loadAll() {
    this.isLoadingAll = true;
    const interval = setInterval(() => {
      this.loadCharacters();
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      this.isLoadingAll = false;
    }, (25 - this.count) * 500);
  }

  loadCharacters() {
    this.api.updatedDataSelection(this.count < 24);
    this.count++;
  }

}
