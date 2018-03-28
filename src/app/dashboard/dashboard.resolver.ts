import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { forkJoin } from "rxjs/observable/forkJoin";
import * as _ from 'lodash';

import { PiratesService } from '../common/core/services/pirates.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {

  constructor(private piratesService: PiratesService) { }

  piratesArr = new Array(25);
  piratesObs = [];
  piratesNew = [];

  bufferArr = new Array(25);

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const promise = new Promise(
      (resolve, reject) => {

        this.piratesArr = _.fill(this.piratesArr, 0);

        let observable = null;
        let link = 405;
        this.piratesArr.forEach((el, i) => {
          if (i < 1) {
            observable = this.piratesService.getPirates(String(link))
            this.piratesObs.push(observable);
            link = 420;
          } else {
            observable = this.piratesService.getPirates(String(link))
            this.piratesObs.push(observable);
            link += 20;
          }
        })

        forkJoin(this.piratesObs).subscribe((response) => {
          this.obsLoop(response);
          resolve(this.piratesNew)
        });

      }
    );

    return promise.then((data: any) => data);
  }

  obsLoop(array: any) {
    array.forEach((el) => {
      el.data.forEach((el2) => {
        this.piratesNew.push(el2)
      })
    })
  }

}
