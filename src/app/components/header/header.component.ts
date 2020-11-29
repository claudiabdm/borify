import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;
  invalidArtist: boolean = false;
  invalidQuery: boolean = false;

  constructor(
    private spotifyApi: SpotifyApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      currentSearch: new FormControl('', Validators.required)
    });
  }

  onSearchSubmit(form: FormGroup): void {
    const searchArtist = form.value.currentSearch.replace(/\s/gi, '%20');
    if (searchArtist === '') {
      this.invalidQuery = true;
    } else {
      this.spotifyApi.searchKeyWord(searchArtist).subscribe((artist: any) => {
        if (!artist) {
          this.invalidArtist = true;
        } else {
          this.invalidArtist = false;
          this.invalidQuery = false;
          this.router.navigate(['artist', artist.id, 'albums']);
        }
      });
    }

  }

}
