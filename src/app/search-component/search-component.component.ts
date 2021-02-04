import { SearchType } from './../common/enums/search-type.enum';
import { LyricsService } from './../lyric/lyrics.service';
import { AlbumService } from './../album/album.service';

import { Component } from '@angular/core';
import { SongService } from '../song/song.service';
import { SongInfo } from '../song/song-info.model';
import { TrackService } from '../track/track.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {

  songsInfo: SongInfo[] = [];
  query: string;
  searchType: string;
  show: boolean = false;
  placeholder: string = 'search by song title..';
  searchCriteria: SearchType = SearchType.Title; // default is Title

  constructor(
    private songService: SongService,
    private albumService: AlbumService,
    private lyricsService: LyricsService,
    private trackService: TrackService
  ) { }

  public getResults(): void {
    this.songsInfo = [];
    if (this.searchCriteria === SearchType.Title) {
      this.songService.getSongInfoByTitleStream(this.query).subscribe(songs => {
        if (songs) {
          songs.forEach(song => {
            // date of release -> album
            this.albumService
              .getAlbumStream(song.id_artist, song.id_album)
              .subscribe(album => {
                // get lyrics
                this.lyricsService
                  .getLyricsStream(song.id_artist, song.id_album, song.id_track)
                  .subscribe(lyrics => {
                    const songInfo: SongInfo = {
                      singerName: song.artist,
                      albumName: song.album,
                      lyrics: lyrics.lyrics,
                      releaseYear: album.realease
                    };
                    console.log(JSON.stringify(songInfo));
                    this.songsInfo.push(songInfo);
                  });
              });
          });
        }
      });
    } else {
      // search by artist
    }
  }

  setSearchPlaceholder(searchType: SearchType): void {
    this.searchCriteria = searchType;
    this.placeholder =
      searchType === SearchType.Title
        ? 'search by song title..'
        : 'search by artist name';
  }
}
