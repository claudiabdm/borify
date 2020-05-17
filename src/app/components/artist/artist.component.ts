import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { filter } from 'rxjs/internal/operators/filter';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  constructor(
    private spotifyApi: SpotifyApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.spotifyApi.currentArtist$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.spotifyApi.currentArtistId = params.get('id');
        this.spotifyApi.updateCurrentArtist(this.spotifyApi.currentArtistId);
        return this.spotifyApi.getArtistInfo(this.spotifyApi.currentArtistId);
      })
    );
  }

  get currentArtist() {
    return this.spotifyApi.currentArtist$;
  }
  get currentId() {
    return this.spotifyApi.currentArtistId;
  }

}
