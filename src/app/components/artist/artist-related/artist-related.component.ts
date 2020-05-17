import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-related',
  templateUrl: './artist-related.component.html',
  styleUrls: ['./artist-related.component.scss']
})
export class ArtistRelatedComponent implements OnInit {


  defaultImg: string = "https://drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg";
  constructor(
    private spotifyApi: SpotifyApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtistRelated$ = this.spotifyApi.getArtistRelated(this.spotifyApi.currentArtistId);
  }

  get currentArtistRelated() {
    return this.spotifyApi.currentArtistRelated$;
  }

  changeArtist(id: string): void {
    this.spotifyApi.updateCurrentArtist(id);
    this.router.navigateByUrl(`artist/${id}/albums`);
  }

}
