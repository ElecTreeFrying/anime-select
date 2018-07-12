import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators'
import * as _ from 'lodash';

import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  pirateCtrl: FormControl;
  reactivePirates: any;

  pirates: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService
  ) { }

  ngOnInit() {
    setTimeout(() => { this.router.navigate(['f'], { relativeTo: this.route }); }, 350);
    this.pirateCtrl = new FormControl(null);

    this.shared.piratesChanged.subscribe((response) => {
      this.pirates = this.pirates.concat(response);
      this.pirateCtrl.patchValue('');
    });

    this.reactivePirates = this.pirateCtrl.valueChanges
      .pipe(
        startWith(this.pirateCtrl.value),
        map(val => this.displayFn(val)),
        map(name => this.filterPirates(name))
      );

    this.reactivePirates.subscribe((response) => {
      this.shared.setAutocomplete = response;
    });
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
  }

  filterPirates(val: string) {
    return val ? this._filter(this.pirates, val) : this.pirates;
  }

  private _filter(pirates: any[], val: string = '') {
    const filterValue = val.toLowerCase();
    const filtered = pirates.filter(pirate => pirate.attributes.names.en.toLowerCase().includes(filterValue));
    const uniq = _.uniqWith(filtered, _.isEqual);
    return uniq;
  }

}
