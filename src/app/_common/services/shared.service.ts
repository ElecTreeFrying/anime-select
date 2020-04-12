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
  "createdAt": "2013-02-20T16:00:25.722Z",
  "updatedAt": "2020-04-12T09:05:37.635Z",
  "slug": "one-piece",
  "synopsis": "Gol D. Roger was known as the \"Pirate King,\" the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\r\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\r\n[Written by MAL Rewrite]",
  "coverImageTopOffset": 50,
  "titles": {
    "en": "One Piece",
    "en_jp": "One Piece",
    "ja_jp": "ONE PIECE"
  },
  "canonicalTitle": "One Piece",
  "abbreviatedTitles": [],
  "averageRating": "82.83",
  "ratingFrequencies": {
    "2": "4066",
    "3": "81",
    "4": "378",
    "5": "66",
    "6": "322",
    "7": "63",
    "8": "4528",
    "9": "85",
    "10": "1090",
    "11": "124",
    "12": "2061",
    "13": "163",
    "14": "10880",
    "15": "390",
    "16": "5216",
    "17": "611",
    "18": "5048",
    "19": "534",
    "20": "44346"
  },
  "userCount": 139816,
  "favoritesCount": 5502,
  "startDate": "1999-10-20",
  "endDate": null,
  "nextRelease": "2020-04-19T09:30:00.000+09:00",
  "popularityRank": 16,
  "ratingRank": 26,
  "ageRating": "PG",
  "ageRatingGuide": "Teens 13 or older",
  "subtype": "TV",
  "status": "current",
  "tba": "",
  "posterImage": {
    "tiny": "https://media.kitsu.io/anime/poster_images/12/tiny.jpg?1490541434",
    "small": "https://media.kitsu.io/anime/poster_images/12/small.jpg?1490541434",
    "medium": "https://media.kitsu.io/anime/poster_images/12/medium.jpg?1490541434",
    "large": "https://media.kitsu.io/anime/poster_images/12/large.jpg?1490541434",
    "original": "https://media.kitsu.io/anime/poster_images/12/original.png?1490541434",
    "meta": {
      "dimensions": {
        "tiny": {
          "width": null,
          "height": null
        },
        "small": {
          "width": null,
          "height": null
        },
        "medium": {
          "width": null,
          "height": null
        },
        "large": {
          "width": null,
          "height": null
        }
      }
    }
  },
  "coverImage": {
    "tiny": "https://media.kitsu.io/anime/cover_images/12/small.jpg",
    "small": "https://media.kitsu.io/anime/cover_images/12/small.jpg",
    "large": "https://media.kitsu.io/anime/cover_images/12/small.jpg",
    "original": "https://media.kitsu.io/anime/cover_images/12/original.jpg",
    "meta": {
      "dimensions": {
        "tiny": {
          "width": 840,
          "height": 200
        },
        "small": {
          "width": 1680,
          "height": 400
        },
        "large": {
          "width": 3360,
          "height": 800
        }
      }
    }
  },
  "episodeCount": null,
  "episodeLength": 24,
  "totalLength": 1680,
  "youtubeVideoId": "um-tFlVamOI",
  "showType": "TV",
  "nsfw": false,
  "relationships": {
    "genres": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/genres",
        "related": "https://kitsu.io/api/edge/anime/12/genres"
      }
    },
    "categories": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/categories",
        "related": "https://kitsu.io/api/edge/anime/12/categories"
      }
    },
    "castings": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/castings",
        "related": "https://kitsu.io/api/edge/anime/12/castings"
      }
    },
    "installments": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/installments",
        "related": "https://kitsu.io/api/edge/anime/12/installments"
      }
    },
    "mappings": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/mappings",
        "related": "https://kitsu.io/api/edge/anime/12/mappings"
      }
    },
    "reviews": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/reviews",
        "related": "https://kitsu.io/api/edge/anime/12/reviews"
      }
    },
    "mediaRelationships": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/media-relationships",
        "related": "https://kitsu.io/api/edge/anime/12/media-relationships"
      }
    },
    "characters": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/characters",
        "related": "https://kitsu.io/api/edge/anime/12/characters"
      }
    },
    "staff": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/staff",
        "related": "https://kitsu.io/api/edge/anime/12/staff"
      }
    },
    "productions": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/productions",
        "related": "https://kitsu.io/api/edge/anime/12/productions"
      }
    },
    "quotes": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/quotes",
        "related": "https://kitsu.io/api/edge/anime/12/quotes"
      }
    },
    "episodes": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/episodes",
        "related": "https://kitsu.io/api/edge/anime/12/episodes"
      }
    },
    "streamingLinks": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/streaming-links",
        "related": "https://kitsu.io/api/edge/anime/12/streaming-links"
      }
    },
    "animeProductions": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/anime-productions",
        "related": "https://kitsu.io/api/edge/anime/12/anime-productions"
      }
    },
    "animeCharacters": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/anime-characters",
        "related": "https://kitsu.io/api/edge/anime/12/anime-characters"
      }
    },
    "animeStaff": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/12/relationships/anime-staff",
        "related": "https://kitsu.io/api/edge/anime/12/anime-staff"
      }
    }
  },
  "key": "One Piece"
}