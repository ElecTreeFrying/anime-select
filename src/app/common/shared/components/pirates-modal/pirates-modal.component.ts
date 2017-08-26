import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dark-pirates-modal',
  templateUrl: './pirates-modal.component.html',
  styleUrls: ['./pirates-modal.component.scss']
})
export class PiratesModalComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<PiratesModalComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
