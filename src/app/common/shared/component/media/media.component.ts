import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

import { HttpService } from '../../../core/service/http.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  next: string = '';
  showtype: string = 'movie';
  media = [];

  piratesMedia = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private dialog: MatDialog,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.getPirateCastings(this.data).subscribe((response) => {
      this.next = response[0].links.next;
      this.media = response;
      this.start();
      this.media.forEach((e) => {
        const media = e.relationships.media.links.related;
        this.http.get(media).subscribe((response: any) => {
          this.piratesMedia.push(response.data);
          this.piratesMedia = _.uniqBy(this.piratesMedia, 'id');
        });
      });
    });
  }

  waitFor(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async start() {
    let flag = true;

    let control = async (num, i, arr) => {
      if (flag !== true || this.next === '' || this.next === undefined) return;
      await this.waitFor(1000).then(() => {
        if (flag !== true || this.next === '' || this.next === undefined) return;
        this.httpService.getPirateCastings(this.next).subscribe((response: any[]) => {
          let buffer = [];
          this.next = response[0].links.next;
          if (response.filter(e => e.links.next === undefined).length > 0) {
            buffer = this.media.concat(response);
            this.media = _.uniqBy(buffer, 'id');
            this.media.forEach((e) => {
              const media = e.relationships.media.links.related;
              this.http.get(media).subscribe((response: any) => {
                this.piratesMedia.push(response.data);
                this.piratesMedia = _.uniqBy(this.piratesMedia, 'id');
              });
            });
            flag = false;
            this.next = '';
          } else {
            buffer = this.media.concat(response);
            this.media = _.uniqBy(buffer, 'id');
            this.media.forEach((e) => {
              const media = e.relationships.media.links.related;
              this.http.get(media).subscribe((response: any) => {
                this.piratesMedia.push(response.data);
                this.piratesMedia = _.uniqBy(this.piratesMedia, 'id');
              });
            });
          }
        });
      });
    };

    await this.asyncForEach(_.fill(new Array(100), ''), control);
  }

  async start_2() {
    let flag = true;

    let control = async (num, i, arr) => {
      if (flag !== true) return;
      await this.waitFor(1000).then(() => {
        this.httpService.getPirateCastings(this.next).subscribe((response: any[]) => {
          let buffer = [];
          this.next = response[0].links.next;
          if (response.filter(e => e.links.next === undefined).length > 0) {
            buffer = this.media.concat(response);
            this.httpService.setNewMedia(response);
            this.media = _.uniqBy(buffer, 'id');
            flag = false;
          } else {
            buffer = this.media.concat(response);
            this.httpService.setNewMedia(response);
            this.media = _.uniqBy(buffer, 'id');
          }
        });
      });
    };

    await this.asyncForEach(_.fill(new Array(100), ''), control);
  }

}
