import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PlaylistsService } from 'src/app/services/playlists.service';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private playlistService: PlaylistsService,
    private spotifyApi: SpotifyApiService
  ) { }

  ngOnInit(): void {

  }

  async createPlayList(input) {
    const track = await this.spotifyApi.getTrack(this.playlistService.selectedSongId).toPromise();
    const newPlaylist = {
      name: input,
      tracks: [track],
    }
    this.playlistService.addPlayList(newPlaylist);
  }

}
