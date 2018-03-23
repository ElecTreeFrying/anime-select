import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { ShortenPipe } from 'ngx-pipes';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SharedService } from '../../../core/services/shared.service';
import { PiratesService } from '../../../core/services/pirates.service';


@Component({
  selector: 'app-learn-more-dialog',
  templateUrl: './learn-more-dialog.component.html',
  styleUrls: ['./learn-more-dialog.component.scss']
})
export class LearnMoreDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private sharedService: SharedService, private piratesService: PiratesService) { }
  description: string = '';

  media = [];

  isShow: boolean = false

  ngOnInit() {
    this.description = String(this.data.attributes.description);

    this.loopNext(this.data.relationships.castings.links.related);
  }

  loopNext(link: string) {
    const promise =  new Promise(
      (resolve, reject) => {
        this.http.get(link).subscribe((response: any) => {

          response.data.forEach((el) => {
            this.http.get(el.relationships.media.links.related).subscribe((data) => {
              this.media.push(data);
            });
          })

          if (response.links.next === undefined) { resolve(this.media); return; }
          this.loopNext(response.links.next);
        });
      }
    );

    Observable.fromPromise(promise).subscribe((response: any) => {
      // this.piratesService.setRelatedMedia = response;
      this.piratesService.setRelatedMedia(response);
      setTimeout(() => { this.isShow = true }, 500);
    });
  }

}
