import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, distinct, toArray } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { sortBy } from 'lodash';

import { SharedService } from './shared.service';

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
    private http: HttpClient,
    private shared: SharedService
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

  character(id: number) {
    return this.http.get(`https://kitsu.io/api/edge/characters/${id}`).pipe(
      map((res) => res['data']),
      map((res) => {
        return { 
          id,
          ...res['attributes'], 
          manga: res['relationships']['castings']['links']['self'], 
          anime: res['relationships']['mediaCharacters']['links']['self'] 
        };
      }),
      mergeMap((res) => {
        return this.http.get(res['manga']).pipe(
          map((d) => {
            return sortBy(d['data'].map((a) => {
              a['id'] = +a['id'];
              return a;
            }), [ 'id' ])
          }),
          map((d) => d.map((e) => 
            this.http.get(`https://kitsu.io/api/edge/castings/${e['id']}/media`) )),
          map((manga) => ({ ...res, manga })),
        )
      }),
      mergeMap((res) => {
        return this.http.get(res['anime']).pipe(
          map((d) => {
            return sortBy(d['data'].map((a) => {
              a['id'] = +a['id'];
              return a;
            }), [ 'id' ]).reverse()
          }), 
          map((d) => d.map((e) =>
            this.http.get(`https://kitsu.io/api/edge/media-characters/${e['id']}/media`))),
          map((anime) => ({ ...res, anime })),
        )
      })
    );
  }

  media(docs: Observable<any>[]) {

    const observable = new Observable((subscriber) => {
      docs.forEach((media) => subscriber.next(media));
      subscriber.complete();
    });

    const pipe = observable.pipe(
      mergeMap((e: any) => e),
      map(e => e['data']),
      distinct(e => e['attributes']['canonicalTitle']),
      toArray()
    ).subscribe((data) => {
      this.shared.updatedMediaSelection = data.map((res) => 
        ({ ...res['attributes'], relationships: res['relationships'] }))
      pipe.unsubscribe();
    });
    
  }

  characters(option: { next: boolean }) {
   
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

  fileNameCount: number;

  _characters(option: { next: boolean }) {

    let link;

    if (option.next) {
      const id = this.id + 20;
      this.id = id < 901 ? id : this.id;
      link = `assets/load-speed/${this.fileNameCount}.json`;
      this.fileNameCount++;
    } else {
      this.fileNameCount = 0;
      link = `assets/load-speed/${this.fileNameCount}.json`;
      this.fileNameCount++;
    }

    return { data: this.http.get(link), id: this.id };
  }

  get _freshLoad() {
    this.id = 405;
    return this.http.get('assets/load-speed/0.json');
  }

}
