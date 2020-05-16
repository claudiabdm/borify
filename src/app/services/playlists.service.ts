import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  // private _listSource = new Subject<string>();
  // listSource$ = this._listSource.asObservable();

  // private _list = new Subject<any>();
  // list$ = this._list.asObservable();

  public playlists = ['Pop', 'Rock'];


  constructor() { }

  // sendMessage(message: string) {
  //   this._listSource.next(message);
  // }

  addPlayList(playListName: any) {
    console.log(playListName)
    return this.playlists.push(playListName);

  }
}
