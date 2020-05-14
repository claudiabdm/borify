import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playList: string[] = ["https://p.scdn.co/mp3-preview/7409d884124b837930e01f79fbeaaf7838640e8d?cid=774b29d4f13844c495f206cafdad9c86", "https://p.scdn.co/mp3-preview/458af51828c1550e4928d6bce492e35079e50fd8?cid=774b29d4f13844c495f206cafdad9c86", "https://p.scdn.co/mp3-preview/cd7991e7076d0410677032dd9093a9cd712b69fd?cid=774b29d4f13844c495f206cafdad9c86", "https://p.scdn.co/mp3-preview/20e27bbc6c7dd769fc5245d2ef6da78e2ad99549?cid=774b29d4f13844c495f206cafdad9c86"];
  currentSong: string = "https://p.scdn.co/mp3-preview/cd7991e7076d0410677032dd9093a9cd712b69fd?cid=774b29d4f13844c495f206cafdad9c86";

  constructor() { }

  play(player: HTMLMediaElement) {
    player.paused ? player.play() : player.pause();
  }

  prev(currentSong: string) {
    const idx = this.playList.findIndex(song => song === currentSong);
    const prevSong = idx > 0 ? this.playList[idx - 1] : this.playList[0];
    return prevSong;
  }

  next(currentSong: string) {
    const idx = this.playList.findIndex(song => song === currentSong);
    const nextSong = idx < this.playList.length - 1 ? this.playList[idx + 1] : this.playList[this.playList.length - 1];
    return nextSong;
  }

  shuffle() {
    for (let i = this.playList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playList[i], this.playList[j]] = [this.playList[j], this.playList[i]];
    }
  }


}
