import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { HttpService } from '../common/core/service/http.service';
import { SharedService } from '../common/core/service/shared.service';

import { PirateComponent } from '../common/shared/component/pirate/pirate.component';

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.scss']
})
export class PiratesComponent implements OnInit, AfterViewInit, OnDestroy {

  dialogRef: MatDialogRef<PirateComponent>;

  pirates = [];
  allPirates = [];
  next: string = '';
  offsetHeight: number = 0;

  constructor(
    private dialog: MatDialog,
    private http: HttpService,
    private shared: SharedService
  ) { }

  isConcatinated: boolean = true;
  isEnd: boolean = true;
  isLoadAll: boolean = false;
  isLoadingAll: boolean = false;

  obsPirateInit: Subscription;
  obsAutocomplete: Subscription;
  obsLoadPirates: Subscription;
  obsScroll: Subscription;
  obsScrollLoad: Subscription;

  ngOnInit() {
    this.obsPirateInit = this.http.getPirates().subscribe((response: any[]) => {
      this.next = response[0].links.next;
      this.pirates = response;
      this.shared.setPirates = response;
      this.isConcatinated = false;
      this.isLoadAll = false;
    });

    this.obsAutocomplete = this.shared.autocompleteChanged.subscribe((response: any[]) => {

      !this.isLoadAll
        ? this.pirates = _.uniq(response, 'id')
        : this.allPirates = _.uniq(response, 'id')

    });

    this.obsLoadPirates = this.shared.loadPiratesChanged.subscribe((response: boolean) => {

      this.isLoadAll = response;
      response ? this.start().then(() => {
        this.shared.setPirates = this.allPirates
      }) : 0;

    });
  }

  ngAfterViewInit() {
    this.obsScroll = this.shared.scrollChanged.subscribe((response: any) => {

      this.pirates.filter(e => e.id > 890).length > 0 ?  (this.isEnd = false) : 0;
      response.isScroll && !this.isConcatinated ? this.onScroll() : 0;
    });
  }

  ngOnDestroy() {
    this.isLoadAll = false;
    this.normalize();
  }

  onScroll() {
    if (this.isLoadAll) return;
    this.isConcatinated = true;
    this.obsScrollLoad = this.http.getPirates(this.next).subscribe((response) => {
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
    let watch = false;

    this.isLoadingAll = true;
    this.shared.setLoadingAllPiratesChanged = this.isLoadingAll;
    this.next = 'https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=405';

    let control = async (num, i, arr) => {
      if (watch || !this.isLoadAll) return;
      await this.waitFor(1000).then(() => {
        this.http.getPirates(this.next).subscribe((response: any[]) => {
          if (watch || !this.isLoadAll) return;
          if (watch) return;
          let buffer = [];
          this.next = response[0].links.next;
          buffer = this.allPirates.concat(response);
          watch = buffer.filter((value) => watch = value.attributes.canonicalName === 'Yainu Nugire').length === 1;
          this.isLoadingAll = !watch;
          this.shared.setLoadingAllPiratesChanged = this.isLoadingAll;
          this.allPirates = watch
            ? _.uniqBy(buffer, 'id').filter(e => e.id < 901)
            : _.uniqBy(buffer, 'id');
        });
      });
    };

    await this.asyncForEach(_.fill(new Array(25), ''), control);
  }

  private normalize() {
    this.pirates = [];
    this.allPirates = [];
    this.obsPirateInit !== undefined ? this.obsPirateInit.unsubscribe() : 0;
    this.obsAutocomplete !== undefined ? this.obsAutocomplete.unsubscribe() : 0;
    this.obsLoadPirates !== undefined ? this.obsLoadPirates.unsubscribe() : 0;
    this.obsScroll !== undefined ? this.obsScroll.unsubscribe() : 0;
    this.obsScrollLoad !== undefined ? this.obsScrollLoad.unsubscribe() : 0;
  }

}
