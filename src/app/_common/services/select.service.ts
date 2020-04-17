import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, mergeMap, toArray, delay } from 'rxjs/operators';
import { sortBy, uniqBy } from 'lodash';

import { SharedService } from './shared.service';
import { Observable, merge } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(
    private http: HttpClient,
    private router: Router, 
    private shared: SharedService
  ) { }

  get media() {
    return this.http.get('assets/api/supported-anime.json');
  }

  private navigateToCharacters(anime: any, type: string = 'anime') {
    localStorage.setItem('anime', anime['canonicalTitle']);
    localStorage.setItem('slug', anime['slug']);
    this.router.navigate(['characters'], {
      queryParams: { [type]: anime['slug'] }
    }).then(() => {
      // do something
    });
  }

  processSelected(anime: any, type: string = 'anime') {

    console.log(anime);
    sessionStorage.setItem('anime', JSON.stringify(anime));

    let step = 0;
    let char = [];

    const charactersLink = anime['links']['characters'];
    this.shared.index = 0;
    this.shared.count = 0;
    this.shared.anime = anime;
    this.shared.mediaCharacters = char;
    this.shared.updatedLoadCountSelection = 0;
    this.shared.updatedNavigatingSelection = 0;

    const $ = this.delayed(charactersLink).subscribe((res) => {
      char = char.concat(res);
      this.shared.mediaCharacters = uniqBy(sortBy(char, [ 'id' ]), 'name');
      this.shared.ceil = Math.ceil(char.length/20);
      this.shared.floor = Math.floor(char.length/20)*20;
      step === 2 ? sessionStorage.setItem('characters', JSON.stringify(char)) : 0;
      step === 2 ? $.unsubscribe() : 0;
      this.shared.updatedNavigatingSelection = step;
      step++;
      console.log(char);
    });

    setTimeout(() => this.navigateToCharacters(anime, type), 1000);
  }

  delayed(character: string): Observable<any[]> {
    return merge(
      this.step(character, 0, 20),
      this.step(character, 20, 50).pipe( delay(100) ),
      this.step(character, 50, 0).pipe( delay(100) )
    )
  }

  step(character: string, start: number, end: number) {
    return this.http.get(character).pipe(
      map((res) =>
        end !== 0 
          ? res['data'].slice(start, end).map(e => +e['id'])
          : res['data'].slice(start).map(e => +e['id'])
      ),
      mergeMap((data) => 
        data.map((id: number) => 
          this.http.get(
            `https://kitsu.io/api/edge/media-characters/${id}/character`
          ).pipe( 
            map(e => ({ id: +e['data']['id'], name: e['data']['attributes']['canonicalName'] })) 
          )
        )
      ),
      mergeMap((e: any) => e),
      toArray()
    );
  }

}
