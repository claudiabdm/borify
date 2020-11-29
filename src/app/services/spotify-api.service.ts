import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, switchMap, shareReplay, startWith } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Artist } from '../shared/models/artist';
import { Album } from '../shared/models/album';
import { Track } from '../shared/models/track';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  url = environment.spotifyApiUrl;

  defaultArtist: Artist = {
    id: '3AA28KZvwAUcZuOKwyblJQ',
    name: 'Gorillaz',
  }

  defaultTrackId = '0d28khcov6AiegSCpG5TuT';

  private artistIdSubject = new BehaviorSubject<string>(this.defaultArtist.id);
  artistIdSelectedAction$ = this.artistIdSubject.asObservable();

  private albumIdSubject = new BehaviorSubject<string>(null);
  albumIdSelectedAction$ = this.albumIdSubject.asObservable();

  currentArtist$: Observable<Artist> = this.artistIdSelectedAction$
    .pipe(
      switchMap(artistId => this.http.get<Artist>(`${this.url}/artists/${artistId}`)),
      shareReplay(1)
    );

  currentArtistAlbums$: Observable<Album[]> = this.artistIdSelectedAction$
    .pipe(
      switchMap(artistId => this.http.get<{ href: string, items: Album[] }>(`${this.url}/artists/${artistId}/albums?include_groups=album&market=ES`)),
      map((res) => {
        const addedItemsName = []
        const sortedAlbums = res.items.reduce((filtered, item) => {
          if (!addedItemsName.includes(item.name)) {
            filtered.push(item);
            addedItemsName.push(item.name);
          }
          return filtered;
        }, []).sort((a, b) =>  new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        console.log(sortedAlbums);
        return sortedAlbums;
      }),
      shareReplay(1)
    );

  currentAlbumTracks$: Observable<Track[]> = this.albumIdSelectedAction$
    .pipe(
      switchMap(albumId => this.http.get<Album>(`${this.url}/albums/${albumId}`)),
      map(album => album.tracks['items'].map((track: Track) => { track['album'] = { ...album }; return track; })),
      shareReplay(1)
    )

  currentArtistRelated$: Observable<Artist[]> = this.artistIdSelectedAction$
    .pipe(
      switchMap(artistId => this.http.get<{ artist: Artist }>(`${this.url}/artists/${artistId}/related-artists`).pipe(map((res: any) => res.artists))),
      shareReplay(1)
    );

  currentArtistTopTracks$: Observable<Track[]> = this.artistIdSelectedAction$
    .pipe(
      switchMap(artistId => this.http.get<{ tracks: Track[] }>(`${this.url}/artists/${artistId}/top-tracks?country=ES`).pipe(map((res: any) => res.tracks))),
      shareReplay(1)
    );

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private http: HttpClient,
  ) { }


  getToken(): Observable<string> {
    this.storage.clear();
    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();
    return this.http.post('https://accounts.spotify.com/api/token', body)
      .pipe(
        tap((res: any) => this.storage.set('token', `Bearer ${res.access_token}`)),
        map((res: any) => `Bearer ${res.access_token}`)
      );
  }

  searchKeyWord(input: string) {
    return this.http.get(`${this.url}/search?q=${input}&type=artist&market=ES&limit=1`).pipe(map((res: any) => res.artists.items[0]));
  }

  changeSelectedArtist(artistId: string) {
    this.artistIdSubject.next(artistId);
  }

  changeSelectedAlbum(albumId: string) {
    this.albumIdSubject.next(albumId);
  }

}
