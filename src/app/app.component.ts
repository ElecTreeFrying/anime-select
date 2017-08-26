import { Component, Input, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { PiratesModalComponent } from './common/shared/components/pirates-modal/pirates-modal.component';

import { PiratesService } from './common/core/services/pirates.service';
import { PiratesRecieveService } from './common/core/services/pirates-recieve.service';

import { PirateDetails } from './common/interfaces/pirate-details';

@Component({
  selector: 'dark-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ PiratesService, PiratesRecieveService ]

})
export class AppComponent implements OnInit{

  dialogRef: MdDialogRef<PiratesModalComponent> | null;
  list: { PirateDetails }[] = [];
  execute: boolean = true;
  show: boolean = true;

  config: any = { }

  constructor(private router: Router, private route: ActivatedRoute, private piratesService: PiratesService, private piratesRecieveService: PiratesRecieveService, public dialog: MdDialog, @Inject(DOCUMENT) doc: any) { }

  ngOnInit() {
    this.piratesRecieveService.initializeData();
    this.router.navigate([], { queryParams: { enter: 0 } })
    this.route.queryParams.subscribe( (query: Params) => {
      let enter = query['enter'];
      enter == 0 ? this.show = true : this.show = false;
    });
    this.config = this.piratesService.dataConfig;
  }

  onCharacterSelect() {
    this.list = this.piratesRecieveService.list;
    this.list.sort((a, b) => { return a['id'] - b['id']; });
  }

  onClickHeader() {
    this.router.navigate(['/'], { queryParams: { enter: 0 } })
  }

  modeDetails() {
    this.dialogRef = this.dialog.open(PiratesModalComponent, this.config)
    this.dialogRef.afterClosed().subscribe( (result: string) => {
      this.dialogRef = null;
    });
  }

  onNextPage() {
    this.router.navigate(['show'], { queryParams: { enter: 1 } })
  }

  onCharacterPage() {
    this.router.navigate(['show', 'app-c', 'characters'], { queryParams: { enter: 3 } })
  }

}
