import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { HttpUtilService } from 'src/app/common/services/http-util.service';
import { Artist } from '../artist/artist.model';
import { ApiResponseWrapper, ApiSongResponse, ArtistResponse, HttpStatusCode, SongResponse } from './../artist/artist-api-response.model';
import { Song } from './song.model';

/**
 * This service fetch song details for a given song Id. It maps 3rd part song response to in-house Song response type.
 */
@Injectable({
  providedIn: 'root'
})
export class SongProxy {

  readonly ROOT_CONTEXT: string = '/genius-api';
  readonly URL: string = `${this.ROOT_CONTEXT}/songs`;

  constructor(private httpUtil: HttpUtilService) { }

  /**
   * Method to fetch song details stream.
   * @param id song Id
   * @returns Observable stream of Song.
   */
  public getSongStream(id: number): Observable<Song> {
    const SONG_URL: string = `${this.URL}/${id}`;
    const httpParams: HttpParams = new HttpParams().set('id', id.toString());
    return this.httpUtil.get<ApiResponseWrapper>(SONG_URL, httpParams)
      .pipe(map(apiResponseWrapper => this.mapResponse(apiResponseWrapper)),
        catchError(() => {
          return throwError('getSongStream service failed');
        })
      );
  }

  /**
   * This method derives properties from ApiResponseWrapper and then maps it to in-house Song interface.
   * @param apiResponseWrapper ApiResponseWrapper object
   * @returns Song 
   */
  public mapResponse(apiResponseWrapper: ApiResponseWrapper): Song {
    if (apiResponseWrapper.meta.status === HttpStatusCode.SUCCESS) {
      const apiSongResponse: ApiSongResponse = apiResponseWrapper.response as ApiSongResponse;
      const song: Song = this.mapSong(apiSongResponse.song);
      return song;
    }
  }

  /**
   * This method maps properties from SongResponse(3rd party) contract to Song(in-house)contract.
   * @param songResponse 3rd party song response object
   * @returns in-house song object
   */
  public mapSong(songResponse: SongResponse): Song {
    const song: Song = {
      id: songResponse.id,
      album: songResponse.album,
      composers: this.getArtists(new Set<ArtistResponse>(songResponse.writer_artists)),
      releaseDate: songResponse.release_date,
      singers: this.getArtists(new Set<ArtistResponse>([songResponse.primary_artist])),
      title: songResponse.title,
      musicPlayerURL: songResponse.apple_music_player_url,
      headerImageURL: songResponse.header_image_url,
      lyricsPath: songResponse.path,
      lyricsURL: songResponse.url
    };
    return song;
  }

  /**
   * This method maps properties from ArtistResponse(3rd party) contract to Artist(in-house)contract.
   * @param artistsResponse 3rd party artist response object
   * @returns in-house artist object
   */
  private getArtists(artistsResponse: Set<ArtistResponse>): Set<Artist> {
    if (artistsResponse) {
      const artists: Set<Artist> = new Set<Artist>();
      artistsResponse.forEach(artistResponse => {
        if (artistResponse) {
          const artist: Artist = {
            id: artistResponse.id,
            fullName: artistResponse.name,
            imageURL: artistResponse.image_url
          };
          artists.add(artist);
        }
      });
      return artists;
    }
  }
}
