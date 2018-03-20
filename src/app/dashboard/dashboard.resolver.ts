import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PiratesService } from '../common/core/services/pirates.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {

  constructor(private piratesService: PiratesService) { }

  arr = [];
  newArr = [];

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const promise = new Promise(
      (resolve, reject) => {
        this.piratesService.getAllPirates().subscribe((response) => {
          this.arr.push(response['data']);
        }, (e) => {
        }, () => {
          this.arr.forEach((el) => el.forEach((el2) => this.newArr.push(el2)))
          resolve(this.newArr);
        });
      }
    );

    return promise.then((data: any) => data);
  }

}
