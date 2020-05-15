import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  url = environment.spotifyApiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getArtistInfo(id: string) {
    return this.http.get(`${this.url}${id}`);
  }

  getArtistAlbums(id: string) {
    return this.http.get(`${this.url}${id}/albums`)
      .pipe(
        map((res: any) => res.items
          .filter((item, idx: number) => {
            if (idx === res.items.length - 1) {
              return item.name !== res.items[idx - 1].name;
            }
            return item.name !== res.items[idx + 1].name;
          })
          .sort((a, b) => new Date(a.release_date) > new Date(b.release_date))
          )
      );
  }

}
