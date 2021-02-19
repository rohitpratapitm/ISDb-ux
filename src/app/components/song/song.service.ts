import { ApiResponseWrapper, HttpStatusCode, HitsResponse, HitsEnum,
  ApiHitsResponse, ArtistResponse, Dom, HttpStatus, SongResponse, ApiSongResponse } from './../artist/artist-api-response.model';
import { Song } from './song.model';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { combineAll, concat, concatAll, map } from 'rxjs/operators';
import { HttpUtilService } from 'src/app/common/services/http-util.service';
import { Artist } from '../artist/artist.model';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})
export class SongProxy {

  readonly ROOT_CONTEXT: string = '/genius-api';
  readonly URL: string = `${this.ROOT_CONTEXT}/songs`;

  constructor(private httpUtil: HttpUtilService) { }

  public getSongStream(id: number): Observable<Song> {
    const SONG_URL: string = `${this.URL}/${id}`;
    const httpParams: HttpParams = new HttpParams().set('id', id.toString());
    return this.httpUtil.get<ApiResponseWrapper>(SONG_URL, httpParams)
      .pipe(map(apiResponseWrapper => this.mapResponse(apiResponseWrapper)));
  }

  public mapResponse(apiResponseWrapper: ApiResponseWrapper): Song {
    if (apiResponseWrapper.meta.status === HttpStatusCode.SUCCESS) {
      const apiSongResponse: ApiSongResponse = apiResponseWrapper.response as ApiSongResponse;
      const song: Song = this.mapSong(apiSongResponse.song);
      return song;
    }
  }

  public mapSong(songResponse: SongResponse): Song {
    const song: Song = {
      id: songResponse.id,
      album: songResponse.album,
      composers: this.getArtists(new Set<ArtistResponse>(songResponse.writer_artists)),
      releaseDate: songResponse.release_date,
      singers: this.getArtists(new Set<ArtistResponse>([songResponse.primary_artist])),
      title: songResponse.title
    };
    return song;
  }

  private getArtists(artistsResponse: Set<ArtistResponse>): Set<Artist> {
    if (artistsResponse) {
      const artists: Set<Artist> = new Set<Artist>();
      artistsResponse.forEach(artistResponse => {
        if (artistResponse) {
          const artist: Artist = {
            id: artistResponse.id,
            fullName: artistResponse.name
          };
          artists.add(artist);
        }
      });
      return artists;
    }
  }
}
