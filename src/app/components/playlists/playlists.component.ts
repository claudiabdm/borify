import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  public playlists: any = [];


  constructor(public dialog: MatDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent, {panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(res => {
      console.log(`Dialog result: ${res}`);
      if (res === true) {
        this.playlists.push()
      }
    });
  }



  ngOnInit(): void {
  }

}
