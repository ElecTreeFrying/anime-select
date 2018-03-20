import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { SharedService } from '../../common/core/services/shared.service';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  pirateCtrl: FormControl;
  reactivePirates: any;

  pirates: any[] = [];

  constructor(private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit() {
    this.pirates = this.route.snapshot.data[0];

    this.pirateCtrl = new FormControl(null);
    this.reactivePirates = this.pirateCtrl.valueChanges
      .pipe(
        startWith(this.pirateCtrl.value),
        map(val => this.displayFn(val)),
        map(name => this.filterPirates(name))
      );

    this.reactivePirates.subscribe(response => {
      this.sharedService.setPiratesValue(response);
    });

    this.sharedService.setAutocompleteConfig(false);
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
  }

  filterPirates(val: string) {
    return val ? this._filter(this.pirates, val) : this.pirates;
  }

  private _filter(pirates: any[], val: string = '') {
    const filterValue = val.toLowerCase();
    return pirates.filter(pirate => pirate.attributes.names.en.toLowerCase().startsWith(filterValue));
  }

}
