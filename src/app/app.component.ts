import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedService } from './common/core/service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService
  ) {}

  ngOnInit() {
    setTimeout(() => { this.router.navigate(['p'], { relativeTo: this.route }); }, 350);

    this.shared.initScrollbar();
  }

}
