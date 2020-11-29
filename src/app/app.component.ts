import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyApiService } from './services/spotify-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'music-player';
  token$: Observable<string>;
  constructor(
    private spotifyApi: SpotifyApiService
  ){}

  ngOnInit(): void {
    this.token$ = this.spotifyApi.getToken();
  }
}
