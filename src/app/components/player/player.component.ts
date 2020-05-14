import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { TimeFormatPipe } from 'src/app/shared/time-format.pipe';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @ViewChild('player') playerElem: ElementRef;

  currentSong: string;
  currentTime: string = '00:00';
  currentSecond: number = 0;

  constructor(
    private playerService: PlayerService,
    private timePipe: TimeFormatPipe,
  ) { }

  get songDuration() {
    return this.timePipe.transform(this.playerElem?.nativeElement.duration);
  }

  get songDurationNum() {
    return this.playerElem ? this.playerElem.nativeElement.duration : NaN;
  }


  ngOnInit(): void {
    this.currentSong = this.playerService.currentSong;
  }

  onPlay() {
    this.playerService.play(this.playerElem.nativeElement);
  }

  onPrev() {
    this.playerElem.nativeElement.src = this.playerService.prev(this.playerElem.nativeElement.src);
    this.onPlay();
  }

  onNext() {
    this.playerElem.nativeElement.src = this.playerService.next(this.playerElem.nativeElement.src);
    this.onPlay();
  }

  onRandom() {
    this.playerService.shuffle();
  }

  onUpdate(e) {
    this.currentTime = this.timePipe.transform(e.target.currentTime);
    this.currentSecond = e.target.currentTime;
  }


  // onRepeat(playList: string[]){

  // }

}
