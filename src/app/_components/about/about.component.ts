import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SnotifyService } from '../../_common/services/snotify.service';
import { ABOUT } from '../../_common/services/shared.service';
import { SnotifyPosition } from 'ng-snotify';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  _item: Subscription
  about: any;

  constructor(
    private snotify: SnotifyService
  ) { }

  ngOnInit(): void {
    this.about = ABOUT;
    console.log(this.about);
  }

  ngOnDestroy() {
    if (!this._item) return;
    this._item.unsubscribe()
  }

  _category(item: any) {
    this._item = item.subscribe((res) => {

      this.snotify._notify(res.description, 'simple', {
        bodyMaxLength: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        position: SnotifyPosition.leftTop,
        showProgressBar: true,
        timeout: 5000
      }, res.title)
    });
  }

}
