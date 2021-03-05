
import { Component, Input } from '@angular/core';
import { Artist } from '../artist/artist.model';

/**
 * This component displays the following info in 3 separate tiles
 * 1st tile: Singer name and image
 * 2nd tile: Biodata
 * 3rd tile: Top 5 popular Albums along with Title, sub title, release date and album cover thumbnale image
 */
@Component({
  selector: 'app-artist-display',
  templateUrl: './artist-display.component.html',
  styleUrls: ['./artist-display.component.scss']
})
export class ArtistDisplayComponent  {

  @Input()
  artist: Artist;

}
