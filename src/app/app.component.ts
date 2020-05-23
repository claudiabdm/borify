import { Component } from '@angular/core';
import { SpotifyApiService } from './services/spotify-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'music-player';


  constructor(
    private spotifyApi: SpotifyApiService
  ){}

  ngOnInit(): void {
    this.spotifyApi.getToken().subscribe();
  }
}
