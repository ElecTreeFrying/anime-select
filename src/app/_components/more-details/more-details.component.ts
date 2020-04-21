import { Component, OnInit, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';

import { SharedService } from '../../_common/services/shared.service';


@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.scss']
})
export class MoreDetailsComponent implements OnInit, AfterViewInit {

  details: any;
  onEnter: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.onEnter = false;
  }

  ngAfterViewInit() {
    this.details = this.shared.anime;
    this.cd.detectChanges();
  }
  
  @HostListener('document:mousemove') 
  mousemove() {
    this.onEnter = true;
  }

}
