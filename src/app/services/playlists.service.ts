import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, scan, shareReplay, tap } from 'rxjs/operators';
import { Playlist } from '../shared/models/playlist';
import { Track } from '../shared/models/track';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  private playlistsAddedSubject: BehaviorSubject<Playlist> = new BehaviorSubject(null);
  playlistsAddedAction$: Observable<Playlist> = this.playlistsAddedSubject.asObservable();

  private playlistSelectedIdSubject: BehaviorSubject<number> = new BehaviorSubject(null);
  playlistSelectedIdAction$: Observable<number> = this.playlistSelectedIdSubject.asObservable();

  private trackAddedSubject: BehaviorSubject<Track> = new BehaviorSubject(null);
  trackAddedAction$: Observable<Track> = this.trackAddedSubject.asObservable();


  playlists$: Observable<Playlist[]> = this.playlistsAddedAction$
    .pipe(
      filter(val => Boolean(val)),
      scan((playlists: Playlist[], newPlaylist: Playlist) => {
        const notNewPlaylistIdx = playlists.findIndex(playlist => playlist.id === newPlaylist.id);
        if (notNewPlaylistIdx > -1) {
          const updatedPlaylist = [...playlists];
          updatedPlaylist[notNewPlaylistIdx] = newPlaylist;
          return updatedPlaylist;
        }
        const id = playlists.length + 1;
        return [...playlists, { ...newPlaylist, id }];
      }, []),
      shareReplay(1)
    );

  selectedPlaylist$ = combineLatest([this.playlists$, this.playlistSelectedIdAction$])
    .pipe(
      map(([playlists, playlistId]) => playlists.find(playlist => playlist.id === playlistId))
    )

  constructor(
    private playerService: PlayerService
  ) { }

  addPlayList(playlist: Playlist) {
    this.playlistsAddedSubject.next(playlist);
  }

  addTrackToPlaylist(playlist: Playlist, track: Track) {
    const isTrackInPlaylist = playlist.tracks.length > 0 && playlist.tracks.findIndex((tk: Track) => tk.id === track.id) > -1;
    const tracks = isTrackInPlaylist ? [...playlist.tracks] : [...playlist.tracks, track];
    const updatedPlaylist = Object.assign({}, playlist, { tracks: tracks });
    this.playlistsAddedSubject.next(updatedPlaylist);
    this.playerService.changeSelectedQueue(updatedPlaylist.tracks);
  }

  changeSelectedPlaylist(playlistId: number) {
    this.playlistSelectedIdSubject.next(playlistId);
  }

  changeSelectedTrackToBeAdded(track: Track) {
    this.trackAddedSubject.next(track);
  }
}
