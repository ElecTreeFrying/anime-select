import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UcFirstPipe } from 'ngx-pipes';
import * as moment from 'moment';

import { SharedService } from '../../../core/services/shared.service';


@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit, AfterViewInit {

  onePieceDetails: any = undefined;

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  ngOnInit() {

    this.onePieceDetails = this.http.get('https://kitsu.io/api/edge/anime?page%5Blimit%5D=1&page%5Boffset%5D=11');
    this.onePieceDetails.subscribe((response) => {
      this.onePieceDetails = response.data[0].attributes;
      const status = this.onePieceDetails.status;
      this.onePieceDetails.status = `${status[0].toUpperCase()}${status.slice(1)}`;
      let japanese = this.onePieceDetails.titles.ja_jp.toLowerCase();
      japanese = japanese.split(' ');
      japanese = `${japanese[0][0].toUpperCase()}${japanese[0].slice(1)} ${japanese[1][0].toUpperCase()}${japanese[1].slice(1)}`;
      this.onePieceDetails.titles.ja_jp = japanese;
    });

  }

  ngAfterViewInit() {
    this.sharedService.initScrollbar();
  }

}
