import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, mergeMap, toArray, delay } from 'rxjs/operators';
import { sortBy } from 'lodash';

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
    return this.http.get('assets/api/supported-anime.json', this.shared.body);
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
      this.shared.mediaCharacters = sortBy(char, [ 'id' ]);
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

  trending(type: boolean) {
    return this.http.get(
      `https://kitsu.io/api/edge/trending/${type ? 'anime' : 'manga'}`,
      this.shared.body
    ).pipe(
      map(res => res['data'].map(e => this.clean(e, type)))
    )
  }

  private delayed(character: string): Observable<any[]> {
    return merge(
      this.step(character, 0, 20),
      this.step(character, 20, 50).pipe( delay(100) ),
      this.step(character, 50, 0).pipe( delay(100) )
    )
  }

  private step(character: string, start: number, end: number) {
    return this.http.get(character, this.shared.body).pipe(
      map((res) =>
        end !== 0 
          ? res['data'].slice(start, end).map(e => +e['id'])
          : res['data'].slice(start).map(e => +e['id'])
      ),
      mergeMap((data) => 
        data.map((id: number) => 
          this.http.get(
            `https://kitsu.io/api/edge/media-characters/${id}/character`,
            this.shared.body
          ).pipe( 
            map(e => ({ id: +e['data']['id'], name: e['data']['attributes']['canonicalName'] })) 
          )
        )
      ),
      mergeMap((e: any) => e),
      toArray()
    );
  }

  private clean(res: any, type: boolean) {

    res['attributes']['id'] = res['id'];

    delete res['type'];
    
    delete res['attributes']['createdAt'];
    delete res['attributes']['updatedAt'];
    delete res['attributes']['coverImageTopOffset'];
    delete res['attributes']['ratingFrequencies'];
    delete res['attributes']['userCount'];
    delete res['attributes']['favoritesCount'];
    delete res['attributes']['nextRelease'];
    delete res['attributes']['tba'];

    // delete res['attributes']['posterImage']['meta'];
    delete res['attributes']['coverImage'];

    const link = 'https://kitsu.io/api/edge';

    res['relationships']['genres'] = link + res['relationships']['genres']['links']['self'];
    res['relationships']['categories'] = link + res['relationships']['categories']['links']['self'];
    res['relationships']['staff'] = link + res['relationships']['staff']['links']['self'];
    res['relationships']['productions'] = link + res['relationships']['productions']['links']['self'];
    res['relationships']['characters'] = link + res['relationships']['characters']['links']['self'];

    delete res['relationships']['installments'];
    delete res['relationships']['mappings'];
    delete res['relationships']['reviews'];
    delete res['relationships']['mediaRelationships'];
    delete res['relationships']['quotes'];
    delete res['relationships']['castings'];


    if (type) {
      
      delete res['attributes']['totalLength:'];
      delete res['attributes']['nsfw'];
      
      res['relationships']['episodes'] = link + res['relationships']['episodes']['links']['self'];
      res['relationships']['streamingLinks'] = link + res['relationships']['streamingLinks']['links']['self'];
    
      delete res['relationships']['animeProductions'];
      delete res['relationships']['animeCharacters'];
      delete res['relationships']['animeStaff'];
    } else {
      
      res['relationships']['episodes'] = link + res['relationships']['chapters']['links']['self'];
      res['relationships']['chapters'] = link + res['relationships']['chapters']['links']['self'];
   
      delete res['relationships']['mangaCharacters'];
      delete res['relationships']['mangaStaff'];
    }

    return { ...res['attributes'], links: res['relationships'] };
  }

}
