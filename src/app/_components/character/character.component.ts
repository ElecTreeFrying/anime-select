import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { ApiService } from '../../_common/services/api.service';
import { SharedService } from '../../_common/services/shared.service';


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  _character: Subscription;
  _media: Subscription;

  otherNamesExists: boolean;
  route: string;
  media: Observable<any[]>;
  selectedMedia: any;
  stringLength: any[];

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private shared: SharedService
  ) { }

  ngOnDestroy() {
    this._character.unsubscribe();
    this._media.unsubscribe();
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

  setDetails() {

    this._character = this.api.character(this.data['id']).subscribe((res) => {
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
    this.selectedMedia = media;
    this.cd.detectChanges();
  }

}
