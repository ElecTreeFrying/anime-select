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
          this.loopG();
          // this.arr.forEach((el) => el.forEach((el2) => this.newArr.push(el2)))
          resolve(this.newArr);
        });
      }
    );

    return promise.then((data: any) => data);
  }

  // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
  // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop

  loopZ() {
    this.arr.map((el) => {
      el.map((el2) => {
        this.newArr.push(el2)
      })
    })
  }


  loopG() {
    this.arr.map(async (el) => {
      await Promise.all(el.map((el2) => {
        this.newArr.push(el2)
      }))
    })
  }

  async loopD() {
    await this.arr.map(async (el) => {
      await Promise.all(el.map((el2) => {
        this.newArr.push(el2)
      }))
    })
  }

  async loop() {
    await Promise.all(this.arr.map(async (el) => {
        await Promise.all(this.arr.map(async (el2) => {
          await this.newArr.push(el2);
        }))
    }));
  }

}
