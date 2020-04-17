import { Component, OnInit, OnDestroy } from '@angular/core';

import { SharedService } from '../_common/services/shared.service';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit, OnDestroy {

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.updatedSelectRouteSSelection = 'report-issue';
  }
  
  ngOnDestroy() {
    this.shared.updatedSelectRouteSSelection = '';
  }

}
