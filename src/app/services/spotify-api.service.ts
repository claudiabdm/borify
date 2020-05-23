import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, scan, tap, switchMap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PlayerService } from './player.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  url = environment.spotifyApiUrl;
  currentArtistId: string = '3AA28KZvwAUcZuOKwyblJQ';
  currentArtist$: Observable<Object>;
  currentArtistAlbums$: Observable<Object>;
  currentArtistRelated$: Observable<Object>;
  currentArtistTracks$: Observable<Object>;


  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private http: HttpClient,
    private router: Router,
    private playerService: PlayerService
  ) { }

  getToken(): Observable<any> {
    this.storage.clear();
    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();
    return this.http.post('https://accounts.spotify.com/api/token', body, {headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': environment.spotifyApiBasicToken,
    }})
      .pipe(
        tap((res: any) => this.storage.set('token', `Bearer ${res.access_token}`)),
        map((res: any) => `Bearer ${res.access_token}`)
      );
  }

  getArtistInfo(id: string) {
    return this.http.get(`${this.url}/artists/${id}`);
  }

  getArtistAlbums(id: string) {
    return this.http.get(`${this.url}/artists/${id}/albums?include_groups=album&market=ES`)
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

  getArtistRelated(id: string) {
    return this.http.get(`${this.url}/artists/${id}/related-artists`).pipe(map((res: any) => res.artists));
  }

  getArtistTracks(id: string) {
    return this.http.get(`${this.url}/artists/${id}/top-tracks?country=ES`).pipe(map((res: any) => res.tracks));
  }

  getAlbumTracks(id: string) {
    return this.http.get(`${this.url}/albums/${id}`)
      .pipe(
        map((res: any) => res.tracks.items.map(track => {
          track.album = {
            name: res.name,
            images: [{ url: res.images[0].url }],
          };
          return track;
        })
        )
      );
  }

  searchKeyWord(input: string) {
    return this.http.get(`${this.url}/search?q=${input}&type=artist&market=ES&limit=1`).pipe(map((res: any) => res.artists.items[0]));
  }

  getTrack(id: string) {
    return this.http.get(`${this.url}/tracks/${id}`);
  }

  updateCurrentArtist(id: string) {
    this.currentArtistId = id;
    this.currentArtist$ = this.getArtistInfo(id);
    this.currentArtistAlbums$ = this.getArtistAlbums(id);
    this.currentArtistRelated$ = this.getArtistRelated(id);
    this.currentArtistTracks$ = this.getArtistTracks(id);
    this.playerService.currentPlaylist$ = this.getArtistTracks(this.currentArtistId);
    this.playerService.currentTrack$ = this.getArtistTracks(this.currentArtistId).pipe(map(tracks => tracks[0]));
  }

}
