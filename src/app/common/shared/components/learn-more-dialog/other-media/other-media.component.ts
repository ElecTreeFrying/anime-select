import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as _ from 'lodash';

import { PiratesService } from '../../../../core/services/pirates.service';

import { MediaComponent } from '../../media/media.component';
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
  isSpecial: boolean = false;
  isTv: boolean = false;
  isOva: boolean = false;
  isShowContent: boolean = false;

  mediaComponentRef: MatDialogRef<MediaComponent>;

  constructor(private router: Router, private dialog: MatDialog, private route: ActivatedRoute, private piratesService: PiratesService) { }

  ngOnInit() {
    this.medias = this.piratesService.getRelatedMedia();
    this.medias = _.uniqBy(this.medias, 'data.attributes.startDate');

    this.isShowContent = true;

    this.medias.forEach((el) => {
      const showType = el.data.attributes.showType;
      if (showType === 'movie')         { this.isMovie = true; this.isShowContent = false; }
      else if (showType === 'special')  { this.isSpecial = true; this.isShowContent = false; }
      else if (showType === 'TV')       { this.isTv = true; this.isShowContent = false; }
      else if (showType === 'OVA')      { this.isOva = true; this.isShowContent = false; }
    })
  }

  onReadMore(media: string) {
    this.mediaComponentRef = this.dialog.open(MediaComponent, { data: media })
    // this.dialog.closeAll();
  }

}
