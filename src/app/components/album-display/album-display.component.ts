
import { Component, Input } from '@angular/core';
import { Artist } from '../artist/artist.model';
import { Song } from '../song/song.model';

@Component({
  selector: 'app-album-display',
  templateUrl: './album-display.component.html'
})
export class AlbumDisplayComponent  {

  @Input()
  song: Song;

}
