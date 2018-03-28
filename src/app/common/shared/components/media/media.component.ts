import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public media: any) { }

  ngOnInit() {
    this.media = this.media.data;
  }

}
