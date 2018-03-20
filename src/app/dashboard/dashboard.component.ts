import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PiratesService } from '../common/core/services/pirates.service';
import { SharedService } from '../common/core/services/shared.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  reactivePirates: any;

  pirates: any[] = [];
  counter: number = 0;
  isShow: boolean = true;
  isShowAutocomplete: number = 0;
  isLoadAutocomplete: boolean = true;
  isDisabled: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private piratesService: PiratesService, private sharedService: SharedService) { }

  ngOnInit() {
    this.piratesService.getPirates(`${405}`).subscribe((response) => {
      this.pirates = response['data'];
    });

    this.counter = 420;

    this.router.navigate(['u1'], { relativeTo: this.route });

    this.sharedService.autocompleteChanged.subscribe((response) => {
      setTimeout(() => this.isShowAutocomplete = this.sharedService.autocompleteChanged.observers.length, 50);
    });

    this.sharedService.piratesChanged.subscribe((response) => {
      setTimeout(() => this.pirates = response, 50);
    });

    setTimeout(() => { this.isDisabled = false }, 8000);
  }

  loadAutocomplete() {
    this.isLoadAutocomplete = false;
  }

  onScroll() {
    if (this.counter <= 880 ) {
      this.piratesService.getPirates(`${this.counter}`).subscribe((response) => {
        this.pirates = this.pirates.concat(response['data']);
        this.counter = this.counter + 20;
      });
    } else {
      this.isShow = false;
    }
  }



}
