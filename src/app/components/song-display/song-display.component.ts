import { Component, Input } from '@angular/core';
import { Song } from '../song/song.model';

/**
 * This component displays the following info in 3 separate tiles
 * 1st tile: Album Title, sub title, release date and album cover image
 * 2nd tile: Lyrics
 * 3rd tile: Singer name, image and biodata
 */
@Component({
  selector: 'app-song-display',
  templateUrl: './song-display.component.html',
  styleUrls: ['./song-display.component.scss']
})
export class SongDisplayComponent {

  @Input()
  song: Song;

}
