import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song/song.model';

@Component({
  selector: 'app-song-display',
  templateUrl: './song-display.component.html',
  styleUrls: ['./song-display.component.css']
})
export class SongDisplayComponent {

  @Input()
  song: Song;

}
