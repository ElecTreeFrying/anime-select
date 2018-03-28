import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class PiratesService {

  relatedMedia = [];

  constructor(private http: HttpClient) { }

  setRelatedMedia(relatedMedia: any) {
    this.relatedMedia = relatedMedia.slice(0);
  }

  getRelatedMedia() {
    return this.relatedMedia;
  }

  getPirates(link: string) {
    return this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=${link}`);
  }

}
