import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { Observable } from 'rxjs';
import { Album } from 'src/app/shared/models/album';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistAlbumsComponent implements OnInit {

  currentArtistAlbums$: Observable<Album[]>;
  currentAlbum$: Observable<Album>;

  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.currentArtistAlbums$ = this.spotifyApi.currentArtistAlbums$;
  }

  changeCurrentAlbumTopTracks(album: Album): void {
    this.playerService.changePreviousTrackFlag('firstAlbumTrack');
    this.spotifyApi.changeSelectedAlbum(album.id);
  }

}
