import { Component, Input } from '@angular/core';
import { Song } from '../song/song.model';

@Component({
  selector: 'app-song-display',
  templateUrl: './song-display.component.html',
  styleUrls: ['./song-display.component.scss']
})
export class SongDisplayComponent {

  @Input()
  song: Song;

}
