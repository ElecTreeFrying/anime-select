import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import * as SimpleBar from 'simpleBar';

import { SharedService } from './common/core/service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  el: any = undefined;
  scrollElement: any = undefined;
  scrollTop: number = 0;
  isMouseOver: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,

    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('onePiece', sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/Strawhat_crew_jolly_roger.svg'));
  }

  ngOnInit() {
    setTimeout(() => { this.router.navigate(['p'], { relativeTo: this.route }); }, 350);
    this.shared.setLoadPiratesChanged = false;

    this.el = new SimpleBar(this.content.nativeElement);
    this.scrollElement = this.el.getScrollElement();
    this.el.getScrollElement().addEventListener('scroll', (status: Event) => {
      const clientHeight = status.srcElement.clientHeight;
      this.scrollTop = status.srcElement.scrollTop;
      const scrollHeight = status.srcElement.scrollHeight;

      const isScroll =
         scrollHeight - Math.ceil(this.scrollTop) === clientHeight + 2
        || scrollHeight - Math.ceil(this.scrollTop) === clientHeight + 1
        || scrollHeight - Math.ceil(this.scrollTop) === clientHeight
        || scrollHeight - Math.ceil(this.scrollTop) === clientHeight - 1
        || scrollHeight - Math.ceil(this.scrollTop) === clientHeight - 2
        || scrollHeight - Math.ceil(this.scrollTop) === clientHeight - 3
        || scrollHeight - Math.ceil(this.scrollTop) === clientHeight - 4
        || scrollHeight - Math.ceil(this.scrollTop) === clientHeight - 5;

      this.shared.setScroll = { isScroll, num: this.scrollTop };
    });
  }

  onRefresh() {
    this.router.navigate(['/'], { relativeTo: this.route });
    setTimeout(() => { this.router.navigate(['/p/f'], { relativeTo: this.route }); }, 500);
  }

  onLoadPirates() {
    this.shared.setLoadPiratesChanged = true;
  }

  onMouseenter() {
    this.isMouseOver = true;
  }

  onMouseleave() {
    this.isMouseOver = false;
  }

  scrollToTop(scrollDuration = 1000) {
    const scrollHeight = this.scrollElement.scrollTop;
    const scrollStep = Math.PI / ( scrollDuration / 15 );
    const cosParameter = scrollHeight / 2;


    let scrollCount = 0
    let scrollMargin = 0;

    let scrollInterval = setInterval( () => {
      if ( scrollHeight - scrollMargin !> 50 ) {
        scrollCount = scrollCount + 1;
        scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
        this.scrollElement.scrollTop = ( scrollHeight - scrollMargin );
      } else {
        clearInterval(scrollInterval);
      }
    }, 15 );
  }

}
