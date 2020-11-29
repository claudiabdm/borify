import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { PlayerService } from 'src/app/services/player.service';
import { ReusableModalComponent } from 'src/app/shared/reusable-modal/reusable-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Track } from 'src/app/shared/models/track';
import { Playlist } from 'src/app/shared/models/playlist';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-player-queue',
  templateUrl: './player-queue.component.html',
  styleUrls: ['./player-queue.component.scss']
})
export class PlayerQueueComponent implements OnInit, OnDestroy {

  currentTrack$: Observable<Track>;
  queue$: Observable<Track[]>;
  playlists$: Observable<Playlist[]>;
  onHidden: boolean = true;
  hidden: boolean = true;
  selectedTrack: Track;

  @Output() close = new EventEmitter<any>();

  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService,
    private playlistService: PlaylistsService,
    private modalService: ModalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentTrack$ = this.playerService.currentTrack$;
    this.queue$ = this.playerService.queueStartingFromCurrentTrack$;
    this.playlists$ = this.playlistService.playlists$;
  }

  ngOnDestroy(): void {
    this.playlistService.changeSelectedTrackToBeAdded(null);
  }

  changeCurrentTrack(track: Track) {
    this.playerService.changeSelectedTrack(track);
  }

  addToPlaylist(playlist: Playlist) {
    this.playlistService.addTrackToPlaylist(playlist, this.selectedTrack);
    this.close.emit();
  }

  onMouseIn(track) {
    track.hidden = false;

  }
  onMouseOut(track) {
    track.hidden = true;
  }

  toggleModal(targetModal: ReusableModalComponent, track?: Track) {
    if (track) {
      this.playlistService.changeSelectedTrackToBeAdded(track);
      this.selectedTrack = track;
    }
    if (!targetModal.modalVisible) {
      this.modalService.openModal(targetModal);
    } else {
      this.modalService.closeModal(targetModal);
      this.playlistService.changeSelectedTrackToBeAdded(null);
    }
  }

  openDialog() {
    this.dialog.open(ModalComponent, { panelClass: 'custom-dialog-container' });
    this.close.emit();
  }

}
