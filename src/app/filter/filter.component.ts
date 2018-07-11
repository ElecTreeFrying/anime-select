import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators'
import * as _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  pirateCtrl: FormControl;

  pirates: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    setTimeout(() => { this.router.navigate(['f'], { relativeTo: this.route }); }, 350);
    this.pirateCtrl = new FormControl(null);
  }

}
