import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { Observable } from 'rxjs';
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
    private route: Router
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtistRelated$ = this.spotifyApi.getArtistRelated(this.spotifyApi.currentArtistId);
  }

  get currentArtistRelated() {
    return this.spotifyApi.currentArtistRelated$;
  }

  changeArtist(id: string): void {
    this.spotifyApi.currentArtistId = id;
    this.spotifyApi.currentArtist$ = this.spotifyApi.getArtistInfo(id);
    this.spotifyApi.currentArtistAlbums$ = this.spotifyApi.getArtistAlbums(id);
    this.spotifyApi.currentArtistRelated$ = this.spotifyApi.getArtistRelated(id);
    this.spotifyApi.currentArtistTracks$ = this.spotifyApi.getArtistTracks(id);
    this.route.navigate(['artist/albums']);
  }

}
