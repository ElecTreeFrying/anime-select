import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { PiratesService } from '../common/core/services/pirates.service';
import { SharedService } from '../common/core/services/shared.service';

import { LearnMoreDialogComponent } from '../common/shared/components/learn-more-dialog/learn-more-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  learnMoreDialogComponentRef: MatDialogRef<LearnMoreDialogComponent>;

  reactivePirates: any;

  pirates: any[] = [];
  counter: number = 0;
  isShow: boolean = true;
  isShowAutocomplete: number = 0;
  isLoadAutocomplete: boolean = true;
  isDisabled: boolean = true;


  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private piratesService: PiratesService, private sharedService: SharedService) { }

  ngOnInit() {
    this.piratesService.getPirates(`${405}`).subscribe((response) => {
      this.pirates = response['data'];
    });

    this.counter = 420;

    this.router.navigate(['u1'], { relativeTo: this.route });

    this.sharedService.autocompleteChanged.subscribe((response) => {
      setTimeout(() => {
        this.isShowAutocomplete = this.sharedService.autocompleteChanged.observers.length
      }, 50);
    });

    this.sharedService.piratesChanged.subscribe((response) => {
      setTimeout(() => {
        if (response.length < 375) this.pirates = response;
      }, 50);
    });

    // setTimeout(() => { this.isDisabled = false }, 8000);
    setTimeout(() => { this.isDisabled = false }, 50);
  }

  loadAutocomplete() {
    this.isLoadAutocomplete = false;
  }

  onScroll() {
    console.log('scrolled');
    if (this.counter <= 880 ) {
      this.piratesService.getPirates(`${this.counter}`).subscribe((response) => {
        this.pirates = this.pirates.concat(response['data']);
        this.counter = this.counter + 20;
      });
    } else {
      this.isShow = false;
    }
  }

  onDialog(pirate: any) {
    const config = {
      data: {
        id: pirate['id'],
        attributes: pirate['attributes'],
        relationships: pirate['relationships']
      }
    };
    this.dialog.open(LearnMoreDialogComponent, config);
  }

}
