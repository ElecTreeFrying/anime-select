import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-search-chips',
  templateUrl: './search-chips.component.html',
  styleUrls: ['./search-chips.component.scss']
})
export class SearchChipsComponent implements OnInit {

  constructor(
    private ref: MatDialogRef<SearchChipsComponent>
  ) { }

  ngOnInit(): void {
  }

  close(sort: string, option: string) {
    this.ref.close({ sort, option, type: 'sort' });
  }

}
