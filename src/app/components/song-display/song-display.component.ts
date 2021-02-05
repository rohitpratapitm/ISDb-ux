import { SongInfo } from './../song/song-info.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-display',
  templateUrl: './song-display.component.html',
  styleUrls: ['./song-display.component.css']
})
export class SongDisplayComponent {

  @Input()
  songInfo: SongInfo;

}
