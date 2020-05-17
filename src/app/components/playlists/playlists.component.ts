import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { PlayerService } from 'src/app/services/player.service';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private playlistService : PlaylistsService,
    private playerService: PlayerService) { }

  ngOnInit(): void {

  }

  get playlists() {
    return this.playlistService.playlists;
  }

  selectPlaylist(playlist) {
    this.playerService.currentPlaylist$ = of(playlist.tracks);
    this.playerService.currentTrack$ = this.playerService.currentPlaylist$.pipe(map((tracks: any) => tracks[0]));
  }


  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {panelClass: 'custom-dialog-container'});

  }


}
