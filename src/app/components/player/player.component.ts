import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { map } from 'rxjs/internal/operators/map';
import { ReusableModalComponent } from 'src/app/shared/reusable-modal/reusable-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @ViewChild('player') playerElem: ElementRef;

  currentTime: string = '00:00';
  currentSecond: number = 0;

  constructor(
    private playerService: PlayerService,
    private spotifyApi: SpotifyApiService,
    private modalService: ModalService,
    private timePipe: TimeFormatPipe,
  ) { }


  ngOnInit(): void {
    this.playerService.currentPlaylist$ = this.spotifyApi.getArtistTracks(this.spotifyApi.currentArtistId);
    this.playerService.currentTrack$ = this.spotifyApi.getArtistTracks(this.spotifyApi.currentArtistId).pipe(map(tracks => tracks[0]));
  }

  get songDuration() {
    return this.playerService.currentTrack$.pipe(map((track: any) => this.timePipe.transform(track.duration_ms)));
  }

  get songDurationNum() {
    return this.playerService.currentTrack$.pipe(map((track: any) => track.preview_url.duration / 1000));
  }

  get currentTrack() {
    return this.playerService.currentTrack$;
  }

  onPlay() {
    if (this.playerElem.nativeElement.paused) {
      this.playerElem.nativeElement.play().then(() => { }).catch((err) => window.alert(err + 'Try again with other song.'))
    } else {
      this.playerElem.nativeElement.pause();
    }
  }

  onPrev() {
    this.playerService.currentTrack$ = this.playerService.prev();
  }

  onNext() {
    this.playerService.currentTrack$ = this.playerService.next();
  }

  onRandom() {
  }

  onUpdate(e) {
    this.currentTime = this.timePipe.transform(e.target.currentTime);
    this.currentSecond = e.target.currentTime;
  }

  toggleModal(targetModal: ReusableModalComponent) {
    if (!targetModal.modalVisible) {
      this.modalService.openModal(targetModal);
    } else {
      this.modalService.closeModal(targetModal);
    }
  }
  // onRepeat(playList: string[]){

  // }

}
