import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { PlayerService } from 'src/app/services/player.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss']
})
export class ArtistAlbumsComponent implements OnInit {


  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtistAlbums$ = this.spotifyApi.getArtistAlbums(this.spotifyApi.currentArtistId)
  }

  get currentArtistAlbums() {
    return this.spotifyApi.currentArtistAlbums$;
  }

  changeCurrentAlbumTracks(id: string) {
    this.playerService.currentPlaylist$ = this.spotifyApi.getAlbumTracks(id);
    this.playerService.currentTrack$ = this.spotifyApi.getAlbumTracks(id).pipe(map(tracks => tracks[0]));
  }

}
