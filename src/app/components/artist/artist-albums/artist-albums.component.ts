import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss']
})
export class ArtistAlbumsComponent implements OnInit {


  constructor(
    private spotifyApi: SpotifyApiService
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtistAlbums$ = this.spotifyApi.getArtistAlbums(this.spotifyApi.currentArtistId)
  }

  get currentArtistAlbums(){
    return this.spotifyApi.currentArtistAlbums$;
  }

}
