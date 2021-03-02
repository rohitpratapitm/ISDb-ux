
import { Component, Input } from '@angular/core';
import { Artist } from '../artist/artist.model';

/**
 * Dumb component which displays artist information.
 */
@Component({
  selector: 'app-artist-display',
  templateUrl: './artist-display.component.html',
  styleUrls: ['./artist-display.component.css']
})
export class ArtistDisplayComponent  {

  @Input()
  artist: Artist;

}
