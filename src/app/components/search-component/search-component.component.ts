import { SearchType } from './../../common/enums/search-type.enum';
import { Component } from '@angular/core';
import { SongService } from '../song/song.service';
import { SongInfo, Artist } from '../song/song-info.model';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { LyricsService } from '../lyrics/lyrics.service';
import { ArtistService } from '../artist/artist.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {

  readonly MAX_QUERY_LENGTH: number = 25;
  readonly MIN_QUERY_LENGTH: number = 3;
  readonly SEARCH_TYPE = SearchType;

  songsInfo: SongInfo[] = [];
  artists: Artist[] = [];
  query: string;
  show: boolean = false;
  placeholder: string = 'search by song title..';
  searchCriteria: SearchType = SearchType.Title; // default is Title

  constructor(
    private songService: SongService,
    private albumService: AlbumService,
    private lyricsService: LyricsService,
    private trackService: TrackService,
    private artistService: ArtistService,
  ) { }

  public getResults(): void {
    this.songsInfo = [];
    if (!this.query){
      return;
    }
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
                    this.songsInfo.push(songInfo);
                  });
              });
          });
        }
      });
    } else {
      this.artists = [];
      // search by artist
      this.artistService.getArtistsStream(8663).subscribe(artists => {
        if (artists) {
          artists.forEach(artistInfo => {
            if (artistInfo.artist.toLowerCase().includes(this.query.toLowerCase())) {
                this.artistService.getArtistStream(artistInfo.id_artist).subscribe(artist => {
                this.artists.push(artist);
              });
            }
          });
        }
      });
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
