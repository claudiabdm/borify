import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';
import { PlayerService } from 'src/app/services/player.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ReusableModalComponent } from 'src/app/shared/reusable-modal/reusable-modal.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-player-queue',
  templateUrl: './player-queue.component.html',
  styleUrls: ['./player-queue.component.scss']
})
export class PlayerQueueComponent implements OnInit {

  onHidden: boolean = true;
  hidden: boolean = true;

  playlists = ['Rock', 'Pop'];
  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.playerService.currentQueue$ = this.spotifyApi.getArtistTracks(this.spotifyApi.currentArtistId);
  }

  get queue() {
    return this.playerService.currentQueue$;
  }

  get currentTrack() {
    return this.playerService.currentTrack$;
  }

  playSong(track: any) {
    this.playerService.currentTrack$ = this.playerService.select(track);
  }

  onMouseIn(track) {
    track.hidden = false;

  }
  onMouseOut(track) {
    track.hidden = true;
  }

  addToPlaylist() {

  }

  toggleModal(targetModal: ReusableModalComponent, id) {
    if (!targetModal.modalVisible) {
      this.modalService.openModal(targetModal);
    } else {
      this.modalService.closeModal(targetModal);
    }
  }

}
