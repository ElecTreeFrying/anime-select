import { Component, OnInit, OnDestroy } from '@angular/core';

import { SharedService } from '../_common/services/shared.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.updatedSelectRouteSSelection = 'about';
  }
  
  ngOnDestroy() {
    this.shared.updatedSelectRouteSSelection = '';
  }

}
