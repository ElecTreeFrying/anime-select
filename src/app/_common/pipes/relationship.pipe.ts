import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, toArray, switchMap, flatMap } from 'rxjs/operators';

import { SharedService } from '../services/shared.service';


@Pipe({
  name: 'relationship'
})
export class RelationshipPipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) {}

  transform(value: any, relationship: string): any {

    if (value === null) return;

    const link = value[relationship];

    if (relationship === 'genres') {
      return this.genres(link);   
    } else if (relationship === 'categories') {
      return this.categories(link);   
    } else if (relationship === 'staff') {
      return this.staff(link);   
    } else if (relationship === 'productions') {
      return this.productions(link);   
    } else if (relationship === 'episodes') {
      return this.episodes(link);   
    } else if (relationship === 'streamingLinks') {
      return this.streamingLinks(link);
    }
  }

  genres(link: string) {
    return this.http.get(link, this.shared.body).pipe(
      map((genre) => genre['data']),
      map((data) => data.map(e => +e['id'])),
      map((data) => {
        return data.map((id: number) => {
          return this.http.get(`https://kitsu.io/api/edge/genres/${id}`, this.shared.body)
        })
      }),
      map((genre) => {
        return genre.map((data) => {
          return data.pipe( 
            map(e => e['data']['attributes']), 
            map(e => e['name']) 
          )
        })
      })
    )
  }

  categories(link: string) {
    return this.http.get(link, this.shared.body).pipe(
      map((category) => category['data']),
      map((data) => data.map(e => +e['id'])),
      map((data) => {
        return data.map((id: number) => {
          return this.http.get(`https://kitsu.io/api/edge/categories/${id}`, this.shared.body)
        })
      }),
      map((category) => {
        return category.map((data) => {
          return data.pipe(
            map(e => e['data']['attributes']), 
            map((e) => {
              return {
                title: e['title'],
                description: e['description'],
                image: e['image']
              }
            }) 
          )
        })
      })
    )
  }

  staff(link: string) {
    return this.http.get(link, this.shared.body).pipe(
      map((staff) => staff['data']),
      map((data) => data.map(e => +e['id'])),
      map((data) => {
        return data.map((id: number) => {
          return this.http.get(`https://kitsu.io/api/edge/media-staff/${id}`, this.shared.body)
        })
      }),
      map((staff) => {
        return staff.map((data) => {
          return data.pipe(
            mergeMap((e) => {
              const role = e['data']['attributes']['role']
              const link = e['data']['relationships']['person']['links']['related'];
              return this.http.get(link, this.shared.body).pipe( 
                map(e => e['data']['attributes']['name']),
                map((name) => ({ name, role })) 
              )
            })
          )
        })
      })
    );
  }

  productions(link: string) {
    return this.http.get(link, this.shared.body).pipe(
      map((production) => production['data']),
      map((data) => data.map(e => +e['id'])),
      map((data) => {
        return data.map((id: number) => {
          return this.http.get(`https://kitsu.io/api/edge/media-productions/${id}`, this.shared.body)
        })
      }),
      map((production) => {
        return production.map((data) => {
          return data.pipe(
            mergeMap((e) => {
              const role = e['data']['attributes']['role']
              const link = e['data']['relationships']['company']['links']['related'];
              return this.http.get(link, this.shared.body).pipe( 
                map(e => e['data']['attributes']['name']),
                map((name) => ({ name, role })) 
              )
            })
          )
        })
      })
    );
  }

  episodes(link: string) {
    return this.http.get(link, this.shared.body).pipe(
      map((episode) => episode['data']),
      map((data) => data.map(e => +e['id'])),
      map((data) => {
        return data.map((id: number) => {
          return this.http.get(`https://kitsu.io/api/edge/episodes/${id}`, this.shared.body)
        })
      }),
      map((episode) => {
        return episode.map((data) => {
          return data.pipe(
            map(e => e['data']['attributes'])
          );
        })
      })
    );
  }

  streamingLinks(link: string) {

    const streamingLinks = this._streamingLinks(link);
    const streamers = this._streamingLinks(link, 'streamer')

    return streamingLinks.pipe(
      flatMap((_streamingLinks: any[]) => streamers.pipe(
        map((_streamers: any[]) => _streamingLinks
          .map((value) => ({ url: value['url'] }))
          .map((value, i) => {
            const siteName = _streamers[i]['siteName'];
            return { ...value, siteName };
        }))
      ))
    );
  }

  private _streamingLinks(link: string, suffix: string = '') {
    return this.http.get(link, this.shared.body).pipe(
      map((streamingLinks) => streamingLinks['data']),
      map((data) => data.map(e => +e['id'])),
      flatMap((data) => {
        return data.map((id: number) => {
          return this.http.get(`https://kitsu.io/api/edge/streaming-links/${id}/${suffix}`, this.shared.body)
          .pipe( map(e => e['data']['attributes']) )
        })
      }),
      flatMap((e: any) => e),
      toArray()
    );
  }

}
