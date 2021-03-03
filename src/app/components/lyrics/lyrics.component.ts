
import { Component, Input } from '@angular/core';
import { Song } from '../song/song.model';
import { HttpUtilService } from '../../common/services/http-util.service';
import { LyricsService } from './lyrics.service';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html'
})
export class LyricsComponent  {

  private _lyricsPath: string;
  lyrics: string;

  @Input()
  set lyricsPath(value: string) {
    if (value !== this._lyricsPath) {
        this._lyricsPath = value;
        this.lyricsService.getLyricsStream(this._lyricsPath).subscribe(lyrics => this.lyrics = lyrics);
    }
  }

  get lyricsPath(): string {
    return this._lyricsPath;
  }

  constructor(private lyricsService: LyricsService) {
  }

}
