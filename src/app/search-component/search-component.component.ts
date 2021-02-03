import { LyricsService } from './../lyric/lyrics.service';
import { AlbumService } from './../album/album.service';

import { Component } from '@angular/core';
import { SongService } from '../song/song.service';
import { SongInfo } from '../song/song-info.model';
import { TrackService } from '../track/track.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {

  songsInfo: SongInfo[] = [];
  query: string;
  show: boolean = false;
  dataSource = new MatTableDataSource<SongInfo>();
  displayedColumns: string[] = ['singerName', 'albumName', 'releaseYear', 'lyrics'];

  constructor(private songService: SongService,
              private albumService: AlbumService,
              private lyricsService: LyricsService,
              private trackService: TrackService) { }

    public getResults(): void {
    this.songService.getSongInfoByTitleStream(this.query).subscribe(songs => {
      if (songs) {
        songs.forEach(song => {
          // date of release -> album
          this.albumService.getAlbumStream(song.id_artist, song.id_album).subscribe(album => {
              // get lyrics 
              this.lyricsService.getLyricsStream(song.id_artist, song.id_album, song.id_track).subscribe(lyrics => {
                const songInfo: SongInfo = {
                  singerName: song.artist,
                  albumName: song.album,
                  lyrics: lyrics.lyrics,
                  releaseYear:  album.realease
                };
                console.log(JSON.stringify(songInfo));
                this.songsInfo.push(songInfo);
                this.dataSource.data = this.songsInfo;
              });
          });
        });
      }
    });
  }
}
