import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  public playlists = [];
  selectedSongId: string = '';


  constructor() { }

  addPlayList(playlist: any) {
    return this.playlists.push(playlist);
  }
}
