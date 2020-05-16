import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';
import { PlayerService } from 'src/app/services/player.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ReusableModalComponent } from 'src/app/shared/reusable-modal/reusable-modal.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-artist-tracks',
  templateUrl: './artist-tracks.component.html',
  styleUrls: ['./artist-tracks.component.scss']
})
export class ArtistTracksComponent implements OnInit {

  hidden: boolean = true;

  playlists = ['Rock', 'Pop'];
  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtistTracks$ = this.spotifyApi.getArtistTracks(this.spotifyApi.currentArtistId);
  }

  get currentArtistTracks() {
    return this.spotifyApi.currentArtistTracks$;
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
