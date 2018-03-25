import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  media: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.media = this.router.getNavigatedData()['data'];

  }

  onBack() {
    this.router.navigateByData({
      url: ['dashboard'],
      data: null,
      extras: {
        queryParams: {
          refresh: false
        }
      }
    });
  }

}
