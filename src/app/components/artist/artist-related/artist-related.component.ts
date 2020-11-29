import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/shared/models/artist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-related',
  templateUrl: './artist-related.component.html',
  styleUrls: ['./artist-related.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistRelatedComponent implements OnInit {

  currentArtistRelated$: Observable<Artist[]>;
  defaultImg: string = "https://drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg";

  constructor(
    private spotifyApi: SpotifyApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentArtistRelated$ = this.spotifyApi.currentArtistRelated$;
  }

  changeArtist(id: string): void {
    this.spotifyApi.changeSelectedArtist(id);
    this.router.navigate(['artist', id, 'albums']);
  }

}
