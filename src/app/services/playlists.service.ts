import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  public playlists = [];
  selectedSongId: string = '';

  constructor() { }

  addPlayList(playlist: any) {
    this.playlists.push(playlist);
  }
}
