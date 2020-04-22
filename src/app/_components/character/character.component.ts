import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { ApiService } from '../../_common/services/api.service';
import { SelectService } from '../../_common/services/select.service';
import { SharedService } from '../../_common/services/shared.service';


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  _character: Subscription;
  _media: Subscription;

  data: any

  otherNamesExists: boolean;
  route: string;
  media: Observable<any[]>;
  selectedMedia: any;
  stringLength: any[];
  
  constructor(
    private ref: MatDialogRef<CharacterComponent>,
    private cd: ChangeDetectorRef,
    private api: ApiService,
    private select: SelectService,
    private shared: SharedService
  ) { }

  ngOnDestroy() {
    this._character.unsubscribe();
    this._media.unsubscribe();
    this.stringLength = [];
    this.shared.updatedMediaSelection = [];
  }

  ngOnInit(): void {
    this.otherNamesExists = false;
    this.route = 'character';
    this.setDetails();
    this.media = this.shared.media;
    this._media = this.media.subscribe((res) => {
      this.stringLength = [ ...Array(res.length).keys() ].map(() => 250);
    });
    this.cd.detectChanges();
  }

  selectMedia(media: any) {
    const subtype = this.selectedMedia.subtype;
    const isAnime = subtype === 'ONA' || subtype === 'OVA' || subtype === 'TV' || subtype === 'movie' || subtype === 'music' || subtype === 'special';
    const clean = this.select._clean(media, isAnime);
    this.select.processSelected(clean, isAnime ? 'anime' : 'manga');
    this.ref.close('to-media');
  }

  setDetails() {

    this._character = this.api.character(+this.ref.id).subscribe((res) => {
      this.otherNamesExists = res['otherNames'].length > 0
      const media = [ ...res['manga'], ...res['anime'] ];
      this.api.media(media);
      this.data = res;
      this.cd.detectChanges();
      this._character.unsubscribe();
    });
  }

  previous: string;

  moreDetails(media: any, route: string) {
    this.previous = this.route;
    this.route = route;
    media['synopsis'] = media['synopsis']
      .replace("\r\n", '<br><br>')
      .replace(".\r\n", '.<br><br>');
    this.selectedMedia = media;
    this.cd.detectChanges();
    console.log(media);
  }

}
