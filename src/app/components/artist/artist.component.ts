import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { filter } from 'rxjs/internal/operators/filter';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { combineLatest, Observable } from 'rxjs';
import { Artist } from 'src/app/shared/models/artist';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistComponent {

  currentArtist$: Observable<Artist>;

  constructor(
    private spotifyApi: SpotifyApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentArtist$ = combineLatest([this.route.paramMap, this.spotifyApi.currentArtist$])
    .pipe(
      map(([params, artist]) => {
        if (params.get('id') !== artist.id) {
          this.spotifyApi.changeSelectedArtist(params.get('id'))
        }
        return artist;
      }),
    )
  }

}
