import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class PiratesService {

  constructor(private http: HttpClient) { }

  getPirates(link: string) {
    return this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=${link}`);
  }

  getAllPirates() {
    return Observable.concat(
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=405`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=420`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=440`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=460`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=480`),

      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=500`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=520`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=540`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=560`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=580`),

      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=600`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=620`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=640`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=660`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=680`),

      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=700`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=720`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=740`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=760`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=780`),

      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=800`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=820`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=840`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=860`),
      this.http.get(`https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=880`)
    )

  }

}
