import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public search="probando";

  constructor(private spotifyApi: SpotifyApiService) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtist$ = this.spotifyApi.getArtistRelated(this.spotifyApi.currentArtistId)
  }

  onSearchChange(searchValue: string): void {
    console.log(searchValue);
    this.spotifyApi.currentArtist$ = this.spotifyApi.searchKeyWord(searchValue);

    let searchInput = document.getElementById('search');

  }

  // filterByText(searchValue) {

  // searchInput.addEventListener('keyup', function (e, artists) => {
  //   let inputText = e.target.value;
  //   let artistas.forEach

  // });

  //}




}
