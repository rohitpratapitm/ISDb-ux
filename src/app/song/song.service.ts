import { HttpUtilService } from './../common/services/http-util.service';

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SongInfo } from './song-info.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../search-component/api-response.model';
import { TrackInfo } from '../track/track.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  // tslint:disable-next-line:no-inferrable-types
  URL: string = '/api/v1/music';

  constructor(private httpUtil: HttpUtilService) { }

  public getSongInfoByTitleStream(title: string): Observable<TrackInfo[]> {
    const httpParams: HttpParams = new HttpParams().set('q', title).append('type', 'track').append('limit', '5');
    return this.httpUtil.get<ApiResponse>(this.URL, httpParams).pipe(map(response => response.result as TrackInfo[]));
  }
}
