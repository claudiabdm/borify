import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { PlayerService } from 'src/app/services/player.service';
import { ReusableModalComponent } from 'src/app/shared/reusable-modal/reusable-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { Observable } from 'rxjs';
import { Track } from 'src/app/shared/models/track';
import { Playlist } from 'src/app/shared/models/playlist';


@Component({
  selector: 'app-artist-tracks',
  templateUrl: './artist-tracks.component.html',
  styleUrls: ['./artist-tracks.component.scss']
})
export class ArtistTracksComponent implements OnInit {

  currentArtistTopTracks$: Observable<Track[]>;
  currentTrack$: Observable<Track>;
  playlists$: Observable<Playlist[]>;

  hidden: boolean = true;
  selectedTrack: Track;

  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService,
    private playlistService: PlaylistsService,
    private modalService: ModalService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentArtistTopTracks$ = this.spotifyApi.currentArtistTopTracks$;
    this.currentTrack$ =  this.playerService.currentTrack$;
    this.playlists$ = this.playlistService.playlists$;
  }

  changeCurrentTrack(track: Track, topArtistTracks: Track[]) {
    this.playerService.changePlayState(true);
    this.playerService.changeSelectedQueue(topArtistTracks);
    this.playerService.changeSelectedTrack(track);
  }

  addToPlaylist(targetModal: ReusableModalComponent, playlist: Playlist) {
    this.playlistService.addTrackToPlaylist(playlist, this.selectedTrack);
    this.modalService.closeModal(targetModal);
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
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {panelClass: 'custom-dialog-container'});
  }

}
