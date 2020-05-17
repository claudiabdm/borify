import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { SpotifyApiService } from './spotify-api.service';
import { map } from 'rxjs/internal/operators/map';
import { switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentQueue$: Observable<Object>;
  currentPlaylist$: Observable<Object>;
  currentTrack$: Observable<Object>;
  currentTrackDuration$: Observable<Object>;
  currentTrackId;
  // currentTrackSource: BehaviorSubject<Object> = new BehaviorSubject(null);

  constructor() { }

  play(player: HTMLMediaElement) {
    player.paused ? player.play() : player.pause();
  }

  prev(): Observable<Object> {
    return this.currentTrack$.pipe(
      map((track: any) => track.id),
      switchMap((id: string) => {
        return this.currentPlaylist$.pipe(
          map((playlist: any[]) => {
            const idx = playlist.findIndex((song: any) => song.id === id);
            const prevSong = idx > 0 ? playlist[idx - 1] : playlist[0];
            return prevSong;
          })
        )
      })
    )
  }

  next(): Observable<Object> {
    return this.currentTrack$.pipe(
      map((track: any) => track.id),
      switchMap((id: string) => {
        return this.currentPlaylist$.pipe(
          map((playlist: any[]) => {
            const idx = playlist.findIndex((song: any) => song.id === id);
            const nextSong = idx < playlist.length - 1 ? playlist[idx + 1] : playlist[playlist.length - 1];
            return nextSong;
          }),
        )
      })
    )
  }

  select(track: any) {
    return this.currentPlaylist$.pipe(
      map((playlist: any[]) => {
        const selectedSong = playlist.find((song: any) => song.id === track.id);
        return selectedSong;
      })
    )
  }

  // selectNext(track: any) {
  //   this.currentTrackSource.next(track);
  // }

  shuffle(): Observable<Object> {
    // return this.currentPlaylist$.pipe(
    //   map((playlist: any[]) => {
    //     debugger
    //     for (let i = playlist.length - 1; i > 0; i--) {
    //       const j = Math.floor(Math.random() * (i + 1));
    //       [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    //     }
    //     console.log(playlist)
    //     return playlist;
    //   })
    // )
    return this.currentPlaylist$.pipe(
      map((playlist: any[]) => {
        for (let i = playlist.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
        }
        return playlist;
      })
    )
  }


}
