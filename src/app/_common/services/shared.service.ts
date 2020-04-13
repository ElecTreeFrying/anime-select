import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  observable: Observable<any>;

  private loadCountSource = new BehaviorSubject(false);
  private triggerRefreshSource = new BehaviorSubject(false);
  private loadCancelSource = new BehaviorSubject(false);
  private loadingInitialSource = new BehaviorSubject(false);
  private characterSource = new BehaviorSubject(this.observable);
  private mediaSource = new BehaviorSubject([]);

  loadCount = this.loadCountSource.asObservable();
  triggerRefresh = this.triggerRefreshSource.asObservable();
  loadCancel = this.loadCancelSource.asObservable();
  loadingInitial = this.loadingInitialSource.asObservable();
  character = this.characterSource.asObservable().pipe( mergeMap(r => r) );
  media = this.mediaSource.asObservable();

  private _episodePrev: any;
  private _staffPrev: any;

  interval: any;
  timeout: any;
  subscription: Subscription;
  
  constructor() { }

  set updatedLoadCountSelection(data: any){
    this.loadCountSource.next(data)
  }

  set updatedTriggerRefreshSelection(data: any) {
    this.triggerRefreshSource.next(data);
  }

  set updatedLoadCancelSelection(data: any) {
    this.loadCancelSource.next(data);
  }

  set updatedLoadingInitialSelection(data: any) {
    this.loadingInitialSource.next(data);
  }

  set updatedCharacterSelection(data: Observable<any>) {
    this.characterSource.next(data);
  }

  set updatedMediaSelection(data: any[]) {
    this.mediaSource.next(data);
  }

  get episodePrev() {
    return this._episodePrev;
  }

  set episodePrev(prev: any) {
    this._episodePrev = prev;
  }

  get staffPrev() {
    return this._staffPrev;
  }

  set staffPrev(prev: any) {
    this._staffPrev = prev;
  }

}

export const ABOUT = {
  "slug": "one-piece",
  "synopsis": "Gol D. Roger was known as the \"Pirate King,\" the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\r\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\r\n[Written by MAL Rewrite]",
  "titles": {
    "ja_jp": "ONE PIECE"
  },
  "canonicalTitle": "One Piece",
  "averageRating": "82.83",
  "startDate": "1999-10-20",
  "popularityRank": 16,
  "ratingRank": 26,
  "ageRating": "PG",
  "ageRatingGuide": "Teens 13 or older",
  "subtype": "TV",
  "status": "current",
  "image": "https://media.kitsu.io/anime/poster_images/12/small.jpg?1490541434",
  "episodeLength": 24,
  "relationships": {
    "genres": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/genres"
      }
    },
    "categories": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/categories"
      }
    },
    "castings": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/castings"
      }
    },
    "staff": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/staff"
      }
    },
    "productions": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/productions"
      }
    },
    "episodes": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/episodes"
      }
    }
  }
}