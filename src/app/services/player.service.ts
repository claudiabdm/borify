import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { SpotifyApiService } from './spotify-api.service';
import { map } from 'rxjs/internal/operators/map';
import { switchMap, filter, tap, flatMap, shareReplay, first, startWith } from 'rxjs/operators';
import { Track } from '../shared/models/track';
import { queue } from 'rxjs/internal/scheduler/queue';
import { Album } from '../shared/models/album';
import { Artist } from '../shared/models/artist';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  emptyTrack: Track = {
    album: { images: [{ url: '' }] } as Album,
    artists: [{ id: '' }] as Artist[],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    id: '',
    name: '',
    preview_url: '',
    track_number: 0,
  }

  private playSelectedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  playSelectedAction$: Observable<boolean> = this.playSelectedSubject.asObservable();

  private queueSelectedSubject: BehaviorSubject<Track[]> = new BehaviorSubject([this.emptyTrack]);
  queueSelectedAction$: Observable<Track[]> = this.queueSelectedSubject.asObservable();

  private controlOptionTrackSubject: BehaviorSubject<string> = new BehaviorSubject('');
  controlOptionTrackAction$: Observable<string> = this.controlOptionTrackSubject.asObservable();

  private trackSelectedSubject: BehaviorSubject<Track> = new BehaviorSubject<Track>(this.emptyTrack);
  trackSelectedAction$: Observable<Track> = this.trackSelectedSubject.asObservable();

  private randomSelectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  randomSelectedAction$: Observable<boolean> = this.randomSelectedSubject.asObservable();

  private previousTrackFlagSubject: BehaviorSubject<'selected' | 'firstAlbumTrack'> = new BehaviorSubject<'selected' | 'firstAlbumTrack'>('selected');
  previousTrackFlagAction$: Observable<'selected' | 'firstAlbumTrack'> = this.previousTrackFlagSubject.asObservable();

  queue$ = merge([this.queueSelectedAction$, this.spotifyApi.currentAlbumTracks$])
    .pipe(
      flatMap(res => res),
    );

  queueStartingFromCurrentTrack$ =
    merge([this.queueSelectedAction$, this.spotifyApi.currentAlbumTracks$])
      .pipe(
        flatMap(queue => queue),
        switchMap(queue => combineLatest([this.trackSelectedAction$, of(queue), this.randomSelectedAction$])),
        map(([currentTrack, currentQueue, isRandom]) => {
          const trackIdx = currentQueue.findIndex(track => track.id === currentTrack.id);
          let queueFromCurrentTrack = [];
          if (isRandom) {
            currentTrack[trackIdx]['visible'] = false;
            queueFromCurrentTrack = [
              ...currentQueue.map(track => { track['visible'] = true; return track })
            ];
            return queueFromCurrentTrack;
          }
          queueFromCurrentTrack = [
            ...currentQueue.slice(0, trackIdx).map(track => { track['visible'] = false; return track; }),
            ...currentQueue.slice(trackIdx + 1).map(track => { track['visible'] = true; return track; })
          ];
          return queueFromCurrentTrack;
        }),
      )

  currentTrack$ = combineLatest([
    this.previousTrackFlagAction$, 
    this.trackSelectedAction$,
    this.spotifyApi.currentAlbumTracks$.pipe(startWith([]), map(tracks => tracks[0]))])
    .pipe(
      map(([flag, selectedTrack, firstAlbumTrack]) => flag === 'selected' ? selectedTrack : firstAlbumTrack)
    )

  currentTrackAndQueue$ = combineLatest([
    this.previousTrackFlagAction$,
    this.trackSelectedAction$,
    this.spotifyApi.currentAlbumTracks$.pipe(startWith([]), map(tracks => tracks[0])),
    this.queue$])
    .pipe(
      map(([flag, selectedTrack, firstAlbumTrack, currentQueue]) => ({ currentTrack: flag === 'selected' ? selectedTrack : firstAlbumTrack, currentQueue }))
    );

  constructor(
    private spotifyApi: SpotifyApiService
  ) { }

  changePlayState(isPlaying: boolean): void {
    this.playSelectedSubject.next(isPlaying);
  }

  changeSelectedQueue(tracklist: Track[], trackId?: string): void {
    this.controlOptionTrackSubject.next('');
    this.queueSelectedSubject.next(tracklist);
  }

  changeSelectedTrack(track: Track): void {
    this.changePreviousTrackFlag('selected');
    this.controlOptionTrackSubject.next('');
    this.trackSelectedSubject.next(track);
  }

  changeControlOptionSelected(option: string): void {
    this.controlOptionTrackSubject.next(option);
  }

  changePreviousTrackFlag(flag: 'selected' | 'firstAlbumTrack'): void {
    this.previousTrackFlagSubject.next(flag);
  }

  nextTrack(currentTrack: Track, currentQueue: Track[]): void {
    const trackIdx = currentQueue.findIndex(track => track.id === currentTrack.id);
    let updatedTrack: Track = trackIdx + 1 < currentQueue.length ? currentQueue[trackIdx + 1] : currentTrack;
    this.trackSelectedSubject.next(updatedTrack);
  }

  prevTrack(currentTrack: Track, currentQueue: Track[]): void {
    const trackIdx = currentQueue.findIndex(track => track.id === currentTrack.id);
    let updatedTrack: Track = trackIdx - 1 < 0 ? currentTrack : currentQueue[trackIdx - 1];
    this.trackSelectedSubject.next(updatedTrack);
  }

  randomQueue(currentQueue: Track[]): void {
    const randomQueue = currentQueue.map((track, idx) => {
      if (!track.hasOwnProperty('orderFlag')) track['orderFlag'] = idx;
      return track;
    });
    for (let i = randomQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomQueue[i], randomQueue[j]] = [randomQueue[j], randomQueue[i]];
    }
    this.queueSelectedSubject.next(randomQueue);
  }

  unrandomQueue(currentQueue: Track[]): void {
    const queue = [...currentQueue].sort((a, b) => a['orderFlag'] - b['orderFlag']);
    this.queueSelectedSubject.next(queue);
  }

}
