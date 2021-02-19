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

  public searchSongsStream(query: string): Observable<Set<Song>> {
    return this.searchHitsStream(query)
      .pipe(
        map((songResponses: Set<SongResponse>) => this.getSongDetailsStream(songResponses))
      );
  }

  private getSongDetailsStream(songResponses: Set<SongResponse>): Set<Song> {
    const songs: Set<Song> = new Set<Song>();
    songResponses.forEach((songResponse: SongResponse) =>
      this.songProxy
        .getSongStream(songResponse.id)
        .subscribe((song) => songs.add(song))
    );
    return songs;
  }

  public searchArtistsStream(query: string): Observable<Set<Artist>> {
    return this.searchHitsStream(query)
      .pipe(
        map((songResponses: Set<SongResponse>) => {
          const artists: Set<Artist> = new Set<Artist>();
          const artistIds: Set<number> = new Set<number>(); 
          songResponses.forEach(songResponse => artistIds.add(songResponse.primary_artist?.id));
          artistIds.forEach((artistId: number) =>
            this.artistProxy
              .getArtistStream(artistId)
              .subscribe((artist) => artists.add(artist))
          );
          return artists;
        })
      );
  }

  public searchHitsStream(query: string): Observable<Set<SongResponse>> {
    const httpParams: HttpParams = new HttpParams().set('q', query);
    return this.httpUtil
      .get<ApiResponseWrapper>(this.SEARCH_URL, httpParams)
      .pipe(
        map((apiResponseWrapper) => this.mapSongsResponse(apiResponseWrapper))
      );
  }

  public getArtistSongsStream(id: number, sort?: string, page?: string, perPage?: string): Observable<Set<Song>> {
    const ARTIST_SONGS_URL: string = `${this.artistProxy.URL}/${id}/songs`;
    const httpParams: HttpParams = new HttpParams()
                                    .set('id', id.toString())
                                    .append('sort', sort)
                                    .append('page', page)
                                    .append('per_page', perPage);
    return this.httpUtil
        .get<ApiResponseWrapper>(ARTIST_SONGS_URL, httpParams)
        .pipe(
            map((apiResponseWrapper) => this.mapSongsResponse(apiResponseWrapper))
        )
        .pipe(
            map((songsResponse) => this.getSongDetailsStream(songsResponse)));
  }

  public mapSongsResponse(
    apiResponseWrapper: ApiResponseWrapper
  ): Set<SongResponse> {
    if (apiResponseWrapper.meta.status === HttpStatusCode.SUCCESS) {
      const apiHitsResponse: ApiHitsResponse = apiResponseWrapper.response as ApiHitsResponse;
      const songResponses: Set<SongResponse> = new Set<SongResponse>();
      apiHitsResponse.hits
        .filter((hit) => hit.type === HitsEnum.Song)
        .forEach((hit) => songResponses.add(hit.result));
      return songResponses;
    }
  }
}
