import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private playlistService: PlaylistsService) { }

  ngOnInit(): void {
  }

  sendPlayList(input) {
    this.playlistService.addPlayList(input);
  }




}
