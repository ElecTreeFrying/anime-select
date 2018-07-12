import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators'
import * as _ from 'lodash';

import { forkJoin } from "rxjs/observable/forkJoin";

import { HttpService } from '../common/core/service/http.service';
import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.scss']
})
export class PiratesComponent implements OnInit, AfterViewInit {

  pirates = [];
  next: string = '';

  scrollbar: any = undefined;

  constructor(
    private http: HttpService,
    private shared: SharedService
  ) {
    this.scrollbar = shared.getScrollbar;
  }

  ngOnInit() {
    this.http.getPirates().subscribe((response: any[]) => {
      this.next = response[0].links.next;
      this.pirates = response;
      this.shared.setPirates = response;
    });;

    this.shared.autocompleteChanged.subscribe((response: any[]) => {
      this.pirates = _.uniq(response, 'id');
    });
  }

  ngAfterViewInit() {
    this.scrollbar[0].addListener((status) => {
      status.limit.y === status.offset.y ? this.onScroll() : 0;
    });
  }

  onScroll() {
    this.http.getPirates(this.next).subscribe((response) => {
      this.next = response[0].links.next;
      this.pirates = this.pirates.concat(response);
      this.shared.setPirates = this.pirates;
    });
  }

  onLaunch(pirate: any) {
    console.log(pirate);
  }

}
