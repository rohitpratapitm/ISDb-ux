import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Artist } from './components/artist/artist.model';
import { Song } from './components/song/song.model';

/**
 * Parent component that displays search and results.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Music Database: Search songs and artists';
  
  song: Song;
  artist: Artist;

  constructor(private titleService: Title, private domSanitizer: DomSanitizer){
    this.titleService.setTitle(this.title); // set the title on browser window top bar
  }

  /**
   * Sets the selected song to be displayed
   * @param song 
   */
  setSelectedSong(song: Song): void {
    this.song = song;
    delete this.artist;
  }

  /**
   * Sets the selected artist to be displayed
   * @param artist 
   */
  setSelectedArtist(artist: Artist): void {
    this.artist = artist;
    delete this.song;
  }
}