import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, distinct, toArray } from 'rxjs/operators'
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { sortBy } from 'lodash';

import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private dataSource = new BehaviorSubject(false);
  private refreshSource = new BehaviorSubject(false);
  data = this.dataSource.asObservable();
  refresh = this.refreshSource.asObservable();

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  updatedDataSelection(data: boolean){
    if (!data) {
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
      this.shared.updatedMediaSelection = data.map((res) => {
        res['attributes']['synopsis'] = res['attributes']['synopsis']
          .replace("\r\n", '<br><br>')
          .replace(".\r\n", '.<br><br>')
        return ({ ...res['attributes'], relationships: res['relationships'] })
      });
      pipe.unsubscribe();
    });
    
  }

  get characters() {

    const start = this.shared.index;
    const end = this.shared.index + 20;

    let characters = this.shared.mediaCharacters;

    const result = characters.slice(start, end);

    this.shared.index = this.shared.index + 20;
    return result;
  }

}
