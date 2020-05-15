import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import {  Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  currentArtistInfo$: Observable<any>;

  constructor(
    private spotifyApi: SpotifyApiService
  ) { }

  ngOnInit(): void {
    this.currentArtistInfo$ = this.spotifyApi.getArtistInfo('3AA28KZvwAUcZuOKwyblJQ');
  }

}
