import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';
import { PlayerService } from 'src/app/services/player.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ReusableModalComponent } from 'src/app/shared/reusable-modal/reusable-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-artist-tracks',
  templateUrl: './artist-tracks.component.html',
  styleUrls: ['./artist-tracks.component.scss']
})
export class ArtistTracksComponent implements OnInit {

  hidden: boolean = true;
  selectedSongId: string = '';

  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService,
    private playlistService: PlaylistsService,
    private modalService: ModalService,
    public dialog: MatDialog,
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

  get playlists() {
    return this.playlistService.playlists;
  }

  playSong(track: any) {
    this.playerService.currentPlaylist$ = this.spotifyApi.getArtistTracks(this.spotifyApi.currentArtistId);
    this.playerService.currentTrack$ = this.playerService.select(track);
  }

  async addToPlaylist(selectedPlaylist) {
    const playlist = this.playlistService.playlists.find(playlist => playlist.name === selectedPlaylist.name);
    const track = await this.spotifyApi.getTrack(this.playlistService.selectedSongId).toPromise();
    playlist.tracks.push(track);
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
  }

}
