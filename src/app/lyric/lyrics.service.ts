import { HttpUtilService } from './../common/services/http-util.service';

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../search-component/api-response.model';
import { Lyrics } from './lyrics.model';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  URL: string = '/api/v1/music/artists';

  constructor(private httpUtil: HttpUtilService) { }

  public getLyricsStream(artistId: number, albumId: number, trackId: number): Observable<Lyrics> {
    const LYRICS_URL: string = `${this.URL}/${artistId}/albums/${albumId}/tracks/${trackId}`;
    const httpParams: HttpParams = new HttpParams()
                                    .set('id_artist', artistId.toString())
                                    .append('id_album', albumId.toString())
                                    .append('id_track', trackId.toString());
    return this.httpUtil.get<ApiResponse>(LYRICS_URL, httpParams).pipe(map(response => response.result as Lyrics ));
  }
}
