import { Artist } from './../artist/artist.model';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpUtilService } from 'src/app/common/services/http-util.service';
import { ArtistProxy } from '../artist/artist.service';
import { Song } from '../song/song.model';
import {
  ApiHitsResponse,
  ApiResponseWrapper,
  HitsEnum,
  HttpStatusCode,
  SongResponse,
} from './../artist/artist-api-response.model';
import { SongProxy } from './../song/song.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly ROOT_CONTEXT: string = '/genius-api';
  readonly SEARCH_URL: string = `${this.ROOT_CONTEXT}/search`;

  constructor(
    private httpUtil: HttpUtilService,
    private songProxy: SongProxy,
    private artistProxy: ArtistProxy
  ) {}

  public searchSongsStream(query: string): Observable<Song[]> {
    return this.searchHitsStream(query)
      .pipe(
        map((songResponses: SongResponse[]) => {
          const songs: Song[] = [];
          songResponses.forEach((songResponse: SongResponse) =>
            this.songProxy
              .getSongStream(songResponse.id)
              .subscribe((song) => songs.push(song))
          );
          return songs;
        })
      );
  }

  public searchArtistsStream(query: string): Observable<Artist[]> {
    return this.searchHitsStream(query)
      .pipe(
        map((songResponses: SongResponse[]) => {
          const artists: Artist[] = [];
          songResponses.forEach((songResponse: SongResponse) =>
            this.artistProxy
              .getArtistStream(songResponse.primary_artist.id)
              .subscribe((artist) => artists.push(artist))
          );
          return artists;
        })
      );
  }

  public searchHitsStream(query: string): Observable<SongResponse[]> {
    const httpParams: HttpParams = new HttpParams().set('q', query);
    return this.httpUtil
      .get<ApiResponseWrapper>(this.SEARCH_URL, httpParams)
      .pipe(
        map((apiResponseWrapper) => this.mapSongsResponse(apiResponseWrapper))
      );
  }

  public mapSongsResponse(
    apiResponseWrapper: ApiResponseWrapper
  ): SongResponse[] {
    if (apiResponseWrapper.meta.status === HttpStatusCode.SUCCESS) {
      const apiHitsResponse: ApiHitsResponse = apiResponseWrapper.response as ApiHitsResponse;
      const songResponses: SongResponse[] = [];
      apiHitsResponse.hits
        .filter((hit) => hit.type === HitsEnum.Song)
        .forEach((hit) => songResponses.push(hit.result));
      return songResponses;
    }
  }
}
