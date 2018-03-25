import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { PiratesService } from '../../../../core/services/pirates.service';

import { ShortenPipe } from 'ngx-pipes';


@Component({
  selector: 'app-other-media',
  templateUrl: './other-media.component.html',
  styleUrls: ['./other-media.component.scss'],
})
export class OtherMediaComponent implements OnInit {

  medias = [];
  showType: string = 'movie';
  isMovie: boolean = false;
  isSpacial: boolean = false;
  isTv: boolean = false;
  isOva: boolean = false;
  isShowContent: boolean = false;

  constructor(private router: Router, private dialog: MatDialog, private route: ActivatedRoute, private piratesService: PiratesService) { }

  ngOnInit() {
    // this.medias = this.piratesService.getRelatedMedia;
    this.medias = this.piratesService.getRelatedMedia();
    this.medias = _.uniqBy(this.medias, 'data.attributes.startDate');

    this.isShowContent = true;

    this.medias.forEach((el) => {
      const showType = el.data.attributes.showType;
      if (el.data.attributes.showType === 'movie') {
        this.isMovie = true;
        this.isShowContent = false;
      }
      else if (el.data.attributes.showType === 'special') {
        this.isSpacial = true;
        this.isShowContent = false;
      }
      else if (el.data.attributes.showType === 'TV') {
        this.isTv = true;
        this.isShowContent = false;
      }
      else if (el.data.attributes.showType === 'OVA') {
        this.isOva = true;
        this.isShowContent = false;
      }
    })
  }

  onReadMore(media: string) {
    this.router.navigateByData({
      url: ['media'],
      data: media
    });

    this.dialog.closeAll();
  }

}
