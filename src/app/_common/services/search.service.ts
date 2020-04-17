import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

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

  searchNext(link: string, selection: string) {
    return this.http.get(link).pipe(
      map((search) => ({
        data: search['data'].map(res => this.clean(res, selection)),
        next: search['links']['next']
      }))
    );
  }

  clean(res: any, selection: string) {

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
    } else if (selection.includes('character')) {


    }

    return { ...res['attributes'], links: res['relationships'] };
  }

}
