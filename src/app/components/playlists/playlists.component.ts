import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private playlistService : PlaylistsService) { }

  ngOnInit(): void {
    // this._playlistService.list
    //     .subscribe(
    //       listName => {
    //         console.log(listName);
    //       }
    //     )

  }

  get playlists() {
    return this.playlistService.playlists;
  }



  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {panelClass: 'custom-dialog-container'});

  }


}
