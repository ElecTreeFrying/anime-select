import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedService } from './common/core/services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit() {
    this.router.navigate(['dashboard']);
  }

  ngAfterViewInit() {
    // this.sharedService.initScrollbar();
  }

}
