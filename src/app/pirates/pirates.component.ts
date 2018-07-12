import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators'
import * as _ from 'lodash';

import { forkJoin } from "rxjs/observable/forkJoin";

import { HttpService } from '../common/core/service/http.service';
import { SharedService } from '../common/core/service/shared.service';

import { PirateComponent } from '../common/shared/component/pirate/pirate.component';

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.scss']
})
export class PiratesComponent implements OnInit, AfterViewInit {

  dialogRef: MatDialogRef<PirateComponent>;

  pirates = [];
  next: string = '';
  offsetHeight: number = 0;

  constructor(
    private dialog: MatDialog,
    private http: HttpService,
    private shared: SharedService
  ) { }

  isConcatinated: boolean = true;
  isEnd: boolean = true;

  ngOnInit() {
    this.http.getPirates().subscribe((response: any[]) => {
      this.next = response[0].links.next;
      this.pirates = response;
      this.shared.setPirates = response;
      this.isConcatinated = false;
    });

    this.shared.autocompleteChanged.subscribe((response: any[]) => {
      this.pirates = _.uniq(response, 'id');
    });

    // this.start();
  }

  ngAfterViewInit() {
    this.shared.scrollChanged.subscribe((response: any) => {
      this.pirates.filter(e => e.id > 890).length > 0 ?  (this.isEnd = false) : 0
      response.isScroll && !this.isConcatinated ? this.onScroll() : 0;
    });
  }

  onScroll() {
    this.isConcatinated = true;
    this.http.getPirates(this.next).subscribe((response) => {
      this.next = response[0].links.next;
      this.pirates = this.pirates.concat(response).filter(e => e.id < 901);
      this.shared.setPirates = this.pirates;
      this.isConcatinated = false;
    });
  }

  onLaunch(pirate: any) {
    this.dialogRef = this.dialog.open(PirateComponent, { data: pirate })
  }

  waitFor(ms) {
    return new Promise(r => setTimeout(r, ms))
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async start() {
    this.http.getPirates().subscribe((response: any[]) => {
      this.next = response[0].links.next;
      this.pirates = response;
      this.shared.setPirates = response;
    });

    let control = async (num, i, arr) => {
      await this.waitFor(1000).then(() => {
        this.http.getPirates(this.next).subscribe((response) => {
          let buffer = [];
          this.next = response[0].links.next;
          buffer = this.pirates.concat(response).filter(e => e.id < 901);
          this.pirates = _.uniqBy(buffer, 'id');
          this.shared.setPirates = this.pirates;
        });
      });
    };

    await this.asyncForEach(_.fill(new Array(100), ''), control);
  }

}
