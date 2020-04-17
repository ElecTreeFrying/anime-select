import { Component, OnInit, OnDestroy } from '@angular/core';

import { SharedService } from '../_common/services/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.updatedSelectRouteSSelection = 'contact';
  }
  
  ngOnDestroy() {
    this.shared.updatedSelectRouteSSelection = '';
  }

}
