import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';
import { PlayerService } from 'src/app/services/player.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artist-tracks',
  templateUrl: './artist-tracks.component.html',
  styleUrls: ['./artist-tracks.component.scss']
})
export class ArtistTracksComponent implements OnInit {

  constructor(
    private spotifyApi: SpotifyApiService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtistTracks$ = this.spotifyApi.getArtistTracks(this.spotifyApi.currentArtistId);
  }

  get currentArtistTracks() {
    return this.spotifyApi.currentArtistTracks$;
  }
  get currentTrack() {
    return this.playerService.currentTrack$;
  }

  playSong(track: any) {
    this.playerService.currentTrack$ = this.playerService.select(track);
  }
}
