import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PlaylistsService } from 'src/app/services/playlists.service';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() type: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private playlistService: PlaylistsService,
    private spotifyApi: SpotifyApiService
  ) { }

  ngOnInit(): void {

  }

  async createPlayList(input) {
    let newPlaylist = {
      name: input,
      tracks: [],
    }
    try {
      const track = await this.spotifyApi.getTrack(this.playlistService.selectedSongId).toPromise();
      newPlaylist.tracks.push(track);
      this.playlistService.addPlayList(newPlaylist);
    } catch(err) {
      this.playlistService.addPlayList(newPlaylist);
    }
  }

}
