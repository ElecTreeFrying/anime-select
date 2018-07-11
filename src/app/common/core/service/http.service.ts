import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {



  constructor(private http: HttpClient) { }

  getPirates(next: string = 'https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=405') {
    return this.http.get(next).pipe(
      map((stream: any) => {
        return stream.data.map((data: any) => {
          data.links['next'] = stream.links.next;
          return data;
        });
      })
    )
  }

}
