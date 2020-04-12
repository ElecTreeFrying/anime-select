import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { ApiService } from '../../_common/services/api.service';
import { SharedService } from '../../_common/services/shared.service';

const MEDIA = {
  "createdAt": "2013-02-20T16:06:54.084Z",
  "updatedAt": "2020-04-12T06:00:20.288Z",
  "slug": "one-piece-2000",
  "synopsis": "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\r\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\r\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
  "coverImageTopOffset": 0,
  "titles": {
    "en_jp": "One Piece Movie 1",
    "ja_jp": "ONE PIECE"
  },
  "canonicalTitle": "One Piece Movie 1",
  "abbreviatedTitles": [
    "One Piece: The Movie"
  ],
  "averageRating": "71.21",
  "ratingFrequencies": {
    "2": "19",
    "3": "1",
    "4": "33",
    "5": "0",
    "6": "38",
    "7": "1",
    "8": "138",
    "9": "1",
    "10": "335",
    "11": "6",
    "12": "657",
    "13": "9",
    "14": "996",
    "15": "9",
    "16": "500",
    "17": "6",
    "18": "185",
    "19": "1",
    "20": "514"
  },
  "userCount": 5918,
  "favoritesCount": 32,
  "startDate": "2000-03-04",
  "endDate": "2000-03-04",
  "nextRelease": null,
  "popularityRank": 1603,
  "ratingRank": 3273,
  "ageRating": "PG",
  "ageRatingGuide": "Teens 13 or older",
  "subtype": "movie",
  "status": "finished",
  "tba": null,
  "posterImage": {
    "tiny": "https://media.kitsu.io/anime/poster_images/421/tiny.jpg?1486236741",
    "small": "https://media.kitsu.io/anime/poster_images/421/small.jpg?1486236741",
    "medium": "https://media.kitsu.io/anime/poster_images/421/medium.jpg?1486236741",
    "large": "https://media.kitsu.io/anime/poster_images/421/large.jpg?1486236741",
    "original": "https://media.kitsu.io/anime/poster_images/421/original.jpg?1486236741",
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
  "coverImage": null,
  "episodeCount": 1,
  "episodeLength": 50,
  "totalLength": 50,
  "youtubeVideoId": "eEApDotghec",
  "showType": "movie",
  "nsfw": false,
  "relationships": {
    "genres": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/genres",
        "related": "https://kitsu.io/api/edge/anime/421/genres"
      }
    },
    "categories": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/categories",
        "related": "https://kitsu.io/api/edge/anime/421/categories"
      }
    },
    "castings": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/castings",
        "related": "https://kitsu.io/api/edge/anime/421/castings"
      }
    },
    "installments": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/installments",
        "related": "https://kitsu.io/api/edge/anime/421/installments"
      }
    },
    "mappings": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/mappings",
        "related": "https://kitsu.io/api/edge/anime/421/mappings"
      }
    },
    "reviews": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/reviews",
        "related": "https://kitsu.io/api/edge/anime/421/reviews"
      }
    },
    "mediaRelationships": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/media-relationships",
        "related": "https://kitsu.io/api/edge/anime/421/media-relationships"
      }
    },
    "characters": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/characters",
        "related": "https://kitsu.io/api/edge/anime/421/characters"
      }
    },
    "staff": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/staff",
        "related": "https://kitsu.io/api/edge/anime/421/staff"
      }
    },
    "productions": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/productions",
        "related": "https://kitsu.io/api/edge/anime/421/productions"
      }
    },
    "quotes": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/quotes",
        "related": "https://kitsu.io/api/edge/anime/421/quotes"
      }
    },
    "episodes": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/episodes",
        "related": "https://kitsu.io/api/edge/anime/421/episodes"
      }
    },
    "streamingLinks": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/streaming-links",
        "related": "https://kitsu.io/api/edge/anime/421/streaming-links"
      }
    },
    "animeProductions": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/anime-productions",
        "related": "https://kitsu.io/api/edge/anime/421/anime-productions"
      }
    },
    "animeCharacters": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/anime-characters",
        "related": "https://kitsu.io/api/edge/anime/421/anime-characters"
      }
    },
    "animeStaff": {
      "links": {
        "self": "https://kitsu.io/api/edge/anime/421/relationships/anime-staff",
        "related": "https://kitsu.io/api/edge/anime/421/anime-staff"
      }
    }
  },
  "key": "One Piece Movie 1"
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  _character: Subscription;
  _media: Subscription;

  otherNamesExists: boolean;
  route: string;
  media: Observable<any[]>;
  selectedMedia: any;
  stringLength: any[];

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private shared: SharedService
  ) { }

  ngOnDestroy() {
    this._character.unsubscribe();
    this._media.unsubscribe();
    this.shared.updatedMediaSelection = [];
  }

  ngOnInit(): void {
    this.otherNamesExists = false;
    this.route = 'character';
    this.setDetails();
    this.media = this.shared.media;
    this._media = this.media.subscribe((res) => {
      this.stringLength = [ ...Array(res.length).keys() ].map(() => 250);
    });

    // this.moreDetails(MEDIA, 'media');
  }

  setDetails() {
    this.data = this.api.character(this.data['id']);
    const manga = this.api.manga(this.data);
    const anime = this.api.anime(manga);

    let count = 0;
    this.shared.updatedCharacterSelection = this.data;
    this._character = this.shared.character.subscribe((res) => {
      count++;
      this.data = res;
      this.otherNamesExists = res['otherNames'].length > 0
      switch (count) {
        case 1: {
          this.shared.updatedCharacterSelection = manga;
          break;
        }
        case 2: {
          this.shared.updatedCharacterSelection = anime;
          break;
        }
        case 3: {
          const media = [ ...res['manga'], ...res['anime'] ];
          this.api.media(media);
          this.data = res;
          this._character.unsubscribe();
          break;
        }
      }
    });
  }

  previous: string;

  moreDetails(media: any, route: string) {
    this.previous = this.route;
    this.route = route;
    this.selectedMedia = media;
    this.cd.detectChanges();
    console.log(media);
  }

}
