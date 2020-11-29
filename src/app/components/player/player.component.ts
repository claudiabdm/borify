import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { map } from 'rxjs/internal/operators/map';
import { ReusableModalComponent } from 'src/app/shared/reusable-modal/reusable-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { tap } from 'rxjs/internal/operators/tap';
import { combineLatest, Observable } from 'rxjs';
import { Track } from 'src/app/shared/models/track';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

  @ViewChild('player') playerElem: ElementRef;

  songDuration$: Observable<number>;
  currentTrackAndQueue$: Observable<{ currentTrack: Track, currentQueue: Track[] }>;
  currentQueue$: Observable<Track[]>;
  playing$: Observable<boolean>;

  currentTime: string = '00:00';
  currentSecond: number = 0;
  random: boolean = false;

  constructor(
    private playerService: PlayerService,
    private spotifyApi: SpotifyApiService,
    private modalService: ModalService,
    private timePipe: TimeFormatPipe,
  ) { }

  ngOnInit(): void {
    this.currentTrackAndQueue$ = this.playerService.currentTrackAndQueue$;
    this.playing$ = this.playerService.playSelectedAction$.pipe(
      tap((isPlaying: boolean) => {
        if (this.playerElem && isPlaying) {
          this.playerElem.nativeElement.play();
        } else if (this.playerElem) {
          this.playerElem.nativeElement.pause();
        }
      }),
    );
  }

  onPlay(state: boolean) {
    this.playerService.changePlayState(state)
  }

  onPrev(trackAndQueue: { currentTrack: Track, currentQueue: Track[] }) {
    const { currentTrack, currentQueue } = trackAndQueue;
    this.playerService.prevTrack(currentTrack, currentQueue);
  }

  onNext(trackAndQueue: { currentTrack: Track, currentQueue: Track[] }) {
    const { currentTrack, currentQueue } = trackAndQueue;
    this.playerService.nextTrack(currentTrack, currentQueue);
  }

  onRandom(currentQueue: Track[]) {
    if (this.random) {
      this.playerService.unrandomQueue(currentQueue);
      this.random = false;
    } else {
      this.playerService.randomQueue(currentQueue);
      this.random = true;
    }
  }

  onUpdate(e) {
    this.currentTime = this.timePipe.transform(e.target.currentTime);
    this.currentSecond = e.target.currentTime * 1000;
  }

  onChangeTime(e) {
    this.playerElem.nativeElement.currentTime = e.target.value / 1000;
  }

  toggleModal(targetModal: ReusableModalComponent) {
    if (!targetModal.modalVisible) {
      this.modalService.openModal(targetModal);
    } else {
      this.modalService.closeModal(targetModal);
    }
  }

}
