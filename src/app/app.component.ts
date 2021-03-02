import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Artist } from './components/artist/artist.model';
import { Song } from './components/song/song.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'ISDb: Search songs and artists';
  
  song: Song;
  artist: Artist;

  constructor(private titleService: Title, private domSanitizer: DomSanitizer){
    this.titleService.setTitle(this.title);
  }

  setSelectedSong(song: Song): void {
    this.song = song;
  }

  getSafeURL(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  setSelectedArtist(artist: Artist): void {
    this.artist = artist;
  }
  
  
}