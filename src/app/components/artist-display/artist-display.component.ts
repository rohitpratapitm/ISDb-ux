import { Artist } from '../song/song-info.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artist-display',
  templateUrl: './artist-display.component.html',
  styleUrls: ['./artist-display.component.css']
})
export class ArtistDisplayComponent  {

  @Input()
  artist: Artist;

}
