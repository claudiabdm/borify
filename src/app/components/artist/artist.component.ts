import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  constructor(
    private spotifyApi: SpotifyApiService
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtist$ = this.spotifyApi.getArtistInfo(this.spotifyApi.currentArtistId);
  }

  get currentArtist() {
    return this.spotifyApi.currentArtist$;
  }

}
