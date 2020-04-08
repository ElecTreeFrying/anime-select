import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _id: number = 405;

  private dataSource = new BehaviorSubject(false);
  private refreshSource = new BehaviorSubject(false);
  data = this.dataSource.asObservable();
  refresh = this.refreshSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  get id() { return this._id; }
  set id(id: number) { this._id = id } 

  updatedDataSelection(data: boolean, config: number = 1){
    if (!data) {
      if (config === 1) return;
      this.refreshSource.next(!data);
    } else {
      this.dataSource.next(data);
    }
  }

  pirate(option: { next: boolean }) {
   
    if (option.next) {
      const id = this.id + 20;
      this.id = id < 901 ? id : this.id;
    }

    const offset = this.id < 884 ? 20 : 15;
    const root = 'https://kitsu.io/api/edge/characters';
    const config = `?page%5Blimit%5D=${offset}&page%5Boffset%5D=`;
    const link = `${root}${config}${this.id}`;

    return { data: this.http.get(link).pipe(
      map((offset: any) => 
        offset['data'].map(e => 
          ({ id: +e['id'], name: e['attributes']['canonicalName'] })  
        )
      )
    ), id: this.id };
  }

  get freshLoad() {
    this.id = 405;
    const link = 'https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=405';
    return this.http.get(link).pipe(
      map((offset: any) => 
        offset['data'].map(e => 
          ({ id: +e['id'], name: e['attributes']['canonicalName'] })  
        )
      )
    )
  }

}
