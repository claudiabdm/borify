import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';
import { PlayerService } from 'src/app/services/player.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ReusableModalComponent } from 'src/app/shared/reusable-modal/reusable-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-player-queue',
  templateUrl: './player-queue.component.html',
  styleUrls: ['./player-queue.component.scss']
})
export class PlayerQueueComponent implements OnInit {

  onHidden: boolean = true;
  hidden: boolean = true;

  @Output() close = new EventEmitter<any>();

  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService,
    private playlistService: PlaylistsService,
    private modalService: ModalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.playerService.currentPlaylist$);
  }

  get queue() {
    return this.playerService.currentPlaylist$;
  }

  get currentTrack() {
    return this.playerService.currentTrack$;
  }

  get playlists() {
    console.log(this.playlistService.playlists);
    return this.playlistService.playlists;
  }

  playSong(track: any) {
    this.playerService.currentTrack$ = this.playerService.select(track);
  }

  async addToPlaylist(selectedPlaylist) {
    const playlist = this.playlistService.playlists.find(playlist => playlist.name === selectedPlaylist.name);
    const track = await this.spotifyApi.getTrack(this.playlistService.selectedSongId).toPromise();
    playlist.tracks.push(track);
    this.close.emit();
  }

  onMouseIn(track) {
    track.hidden = false;

  }
  onMouseOut(track) {
    track.hidden = true;
  }

  toggleModal(targetModal: ReusableModalComponent, id: string) {
    if (id) {
      this.playlistService.selectedSongId = id;
    }
    if (!targetModal.modalVisible) {
      this.modalService.openModal(targetModal);
    } else {
      this.modalService.closeModal(targetModal);
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {panelClass: 'custom-dialog-container'});
    this.close.emit();
  }

}
