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
  readonly SEARCH_URL: string = `${this.ROOT_CONTEXT}/search`;

  constructor(private httpUtil: HttpUtilService) { }

  public searchSongsStream(query: string): Observable<Song[]> {
    const httpParams: HttpParams = new HttpParams().set('q', query);
    return this.httpUtil.get<ApiResponseWrapper>(this.SEARCH_URL, httpParams)
      .pipe(map(apiResponseWrapper => this.mapSongsResponse(apiResponseWrapper)))
      .pipe(map((songResponses: SongResponse[]) => {
        const songs: Song[] = [];
        songResponses.forEach((songResponse: SongResponse) => this.getSongStream(songResponse.id).subscribe(song => songs.push(song)));
        return songs;
      }));
  }

  public getSongStream(id: number): Observable<Song> {
    const SONG_URL: string = `${this.URL}/${id}`;
    const httpParams: HttpParams = new HttpParams().set('id', id.toString());
    return this.httpUtil.get<ApiResponseWrapper>(SONG_URL, httpParams)
      .pipe(map(apiResponseWrapper => this.mapResponse(apiResponseWrapper)));
  }

  public mapSongsResponse(apiResponseWrapper: ApiResponseWrapper): SongResponse[] {
    if (apiResponseWrapper.meta.status === HttpStatusCode.SUCCESS) {
      const apiHitsResponse: ApiHitsResponse = apiResponseWrapper.response as ApiHitsResponse;
      const songResponses: SongResponse[] = [];
      apiHitsResponse.hits.filter(hit => hit.type === HitsEnum.Song).forEach(hit => songResponses.push(hit.result));
      return songResponses;
    }
  }

  public mapResponse(apiResponseWrapper: ApiResponseWrapper): Song {
    if (apiResponseWrapper.meta.status === HttpStatusCode.SUCCESS) {
      const apiSongResponse: ApiSongResponse = apiResponseWrapper.response as ApiSongResponse;
      const song: Song = this.mapSong(apiSongResponse.song);
      return song;
    }
  }

  private mapSong(songResponse: SongResponse): Song {
    const song: Song = {
      id: songResponse.id,
      album: songResponse.album,
      composers: this.getArtists(songResponse.writer_artists),
      releaseDate: songResponse.release_date,
      singers: this.getArtists([songResponse.primary_artist]),
      title: songResponse.title
    };
    return song;
  }

  private getArtists(artistsResponse: ArtistResponse[]): Artist[] {
    if (artistsResponse) {
      const artists: Artist[] = [];
      artistsResponse.forEach(artistResponse => {
        if (artistResponse) {
          const artist: Artist = {
            id: artistResponse.id,
            fullName: artistResponse.name
          };
          artists.push(artist);
        }
      });
      return artists;
    }
  }
}
