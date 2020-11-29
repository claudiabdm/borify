import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { PlayerService } from 'src/app/services/player.service';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/shared/models/playlist';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  playlists$: Observable<Playlist[]>;

  constructor(
    public dialog: MatDialog,
    private playlistService : PlaylistsService,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playlists$ = this.playlistService.playlists$;
  }

  onSelectPlaylist(playlist: Playlist) {
    this.playlistService.changeSelectedPlaylist(playlist.id);
    this.playerService.changeSelectedQueue(playlist.tracks);
  }

  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {panelClass: 'custom-dialog-container'});
  }


}
