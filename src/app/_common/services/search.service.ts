import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  get genres() {
    return this.http.get('https://kitsu.io/api/edge/genres?page%5Blimit%5D=62').pipe(
      map((res) => res['data']),
      map((genres) => {
        return genres.map((genre) => ({ 
          id: genre['id'], 
          name: genre['attributes']['name'],
          slug: genre['attributes']['name']
        }))
      })
    )
  }

  searchStart(text: string, selection: string) {

    const encode = encodeURI(text);

    let link;
   
    if (selection.includes('anime')) {
      link = `https://kitsu.io/api/edge/anime?filter[text]=${encode}`;
    } else if (selection.includes('manga')) {
      link = `https://kitsu.io/api/edge/manga?filter[text]=${encode}`;
    } else if (selection.includes('character')) {
      link = `https://kitsu.io/api/edge/character?filter[slug]=${encode}`;
    }

    return this.http.get(link).pipe(
      map((search) => ({
        data: search['data'].map(res => this.clean(res, selection)),
        next: search['links']['next']
      }))
    );
  }

  searchByGenre(genre: string, selection: string) {

    const encode = encodeURI(genre).toLowerCase();

    let link; 
    
    if (selection.includes('anime')) {
      link = `https://kitsu.io/api/edge/anime?filter[genres]=${encode}`;
    } else if (selection.includes('manga')) {
      link = `https://kitsu.io/api/edge/manga?filter[genres]=${encode}`;
    }

    return this.http.get(link).pipe(
      map((search) => ({
        data: search['data'].map(res => this.clean(res, selection)),
        next: search['links']['next']
      }))
    );
  }

  searchNext(link: string, selection: string) {
    return this.http.get(link).pipe(
      map((search) => ({
        data: search['data'].map(res => this.clean(res, selection)),
        next: search['links']['next']
      }))
    );
  }

  searchRandom(selection: string) {

    return this.http.get(`https://kitsu.io/api/edge/${selection}`).pipe(
      map((res) => res['meta']['count']),
      mergeMap((count) => {
        const id = this.randomInteger(0, count);
        return this.http.get(`https://kitsu.io/api/edge/${selection}/${id}`).pipe(
          map(e => this.clean(e['data'], selection)),
          catchError((err, caught) => this.handleError(err, selection))
        )
      })
    );

  }

  private clean(res: any, selection: string) {

    delete res['id'];
    delete res['type'];
    
    delete res['attributes']['createdAt'];
    delete res['attributes']['updatedAt'];
    delete res['attributes']['coverImageTopOffset'];
    delete res['attributes']['ratingFrequencies'];
    delete res['attributes']['userCount'];
    delete res['attributes']['favoritesCount'];
    delete res['attributes']['nextRelease'];
    delete res['attributes']['tba'];

    delete res['attributes']['posterImage']['meta'];
    delete res['attributes']['coverImage'];

    res['relationships']['genres'] = res['relationships']['genres']['links']['self'];
    res['relationships']['categories'] = res['relationships']['categories']['links']['self'];
    res['relationships']['staff'] = res['relationships']['staff']['links']['self'];
    res['relationships']['productions'] = res['relationships']['productions']['links']['self'];
    res['relationships']['characters'] = res['relationships']['characters']['links']['self'];

    delete res['relationships']['installments'];
    delete res['relationships']['mappings'];
    delete res['relationships']['reviews'];
    delete res['relationships']['mediaRelationships'];
    delete res['relationships']['quotes'];
    delete res['relationships']['castings'];


    if (selection.includes('anime')) {
      
      delete res['attributes']['totalLength:'];
      delete res['attributes']['nsfw'];
      
      res['relationships']['episodes'] = res['relationships']['episodes']['links']['self'];
    
      delete res['relationships']['animeProductions'];
      delete res['relationships']['animeCharacters'];
      delete res['relationships']['animeStaff'];
      delete res['relationships']['streamingLinks'];
    } else if (selection.includes('manga')) {
      
      res['relationships']['episodes'] = res['relationships']['chapters']['links']['self'];
      res['relationships']['chapters'] = res['relationships']['chapters']['links']['self'];
   
      delete res['relationships']['mangaCharacters'];
      delete res['relationships']['mangaStaff'];
    }

    return { ...res['attributes'], links: res['relationships'] };
  }

  private randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private handleError(error: HttpErrorResponse, selection: string) {
    return this.searchRandom(selection);
  };

}
