import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  ngOnInit() {
    // this.sharedService.initScrollbar();
    this.description = String(this.data.attributes.description);

    // console.log(this.data.relationships.castings);
    // console.log(this.data.relationships.castings.links.related);


    const media = [];

    const promise = new Promise(
      (resolve, reject) => {
        this.http.get(this.data.relationships.castings.links.related).subscribe((response: any) => {
          if (response.links.next === undefined) { resolve(media); return; };
          media.push(response.links.next);
          this.http.get(response.links.next).subscribe((response2: any) => {
            if (response2.links.next === undefined) { resolve(media); return; };
            media.push(response2.links.next);
            this.http.get(response2.links.next).subscribe((response3: any) => {
              if (response3.links.next === undefined) { resolve(media); return; };
              media.push(response3.links.next);
              this.http.get(response3.links.next).subscribe((response4: any) => {
                if (response4.links.next === undefined) { resolve(media); return; };
                media.push(response4.links.next);
                this.http.get(response4.links.next).subscribe((response5: any) => {
                  if (response5.links.next === undefined) { resolve(media); return; };
                  media.push(response5.links.next);
                  this.http.get(response5.links.next).subscribe((response6: any) => {
                    if (response6.links.next === undefined) { resolve(media); return; };
                    media.push(response6.links.next);
                    this.http.get(response6.links.next).subscribe((response7: any) => {
                      if (response7.links.next === undefined) { resolve(media); return; };
                    }); }); }); }); }); }); }); } );

    promise.then((response) => {
      console.log(response);
    })



    // console.log(this.data.relationships.castings.links.related.next.links.next);
    // console.log(this.data.relationships.castings.links.related.next.links.next.links.next);

    let buffer = null;

    // this.piratesService.getRelatedLinks(this.data.relationships.castings.links.related).subscribe((response) => {
      // console.log(response);
    // });

  }

}


// let whileBuffer = null;
// let responseBuffer = null;
//
// this.http.get(this.data.relationships.castings.links.related).subscribe((response: any) => {
//   whileBuffer = response.links.next !== undefined;
//   responseBuffer = response.links.next;
//   media.push(responseBuffer);
//
//   // while (whileBuffer) {
//   //   console.log('holy ****');
//   //   this.http.get(responseBuffer).subscribe((response2: any) => {
//   //     whileBuffer = response2.links.next === undefined;
//   //     responseBuffer = response2.links.next;
//   //     media.push(responseBuffer);
//   //     console.log(media);
//   //   });
//   // }
//
//   // do {
//   //   console.log('holy ****');
//   //   this.http.get(responseBuffer).subscribe((response2: any) => {
//   //     whileBuffer = response2.links.next === undefined;
//   //     responseBuffer = response2.links.next;
//   //     media.push(responseBuffer);
//   //     console.log(media);
//   //   });
//   // } while (whileBuffer)
//
// });
