import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PlaylistsService } from 'src/app/services/playlists.service';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() type: string;

  private unsuscribeSubject = new Subject();
  selectedTrack: Track;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private playlistService: PlaylistsService,
    private spotifyApi: SpotifyApiService
  ) { }

  ngOnInit(): void {
    this.playlistService.trackAddedAction$.pipe(takeUntil(this.unsuscribeSubject)).subscribe(track => this.selectedTrack = track);
  }

  ngOnDestroy(): void {
    this.unsuscribeSubject.next();
    this.unsuscribeSubject.complete();
    this.playlistService.changeSelectedTrackToBeAdded(null);
  }

  createPlaylist(playlistName: string) {
    const newPlaylist: Playlist = {
      id: 0,
      name: playlistName,
      tracks: this.selectedTrack ? [this.selectedTrack] : [],
    }
    this.playlistService.addPlayList(newPlaylist);
  }



}
