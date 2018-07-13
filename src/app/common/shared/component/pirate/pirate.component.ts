import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { MediaComponent } from '../media/media.component';

@Component({
  selector: 'app-pirate',
  templateUrl: './pirate.component.html',
  styleUrls: ['./pirate.component.scss']
})
export class PirateComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onMedia() {
    this.dialog.open(MediaComponent, { data: this.data.relationships.castings.links.related });
  }

}
