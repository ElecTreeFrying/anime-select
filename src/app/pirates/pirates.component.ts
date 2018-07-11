import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../common/core/service/http.service';

// import {  } from 'scrollreveal';

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.scss']
})
export class PiratesComponent implements OnInit {

  pirates: Observable<any>;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.pirates = this.http.getPirates();
    this.http.getPirates().subscribe((response) => {

      response.forEach((e) => {
        console.log(e);
      });

    });
  }

  onLaunch(pirate: any) {
    console.log(pirate);
  }

}
