import { HttpUtilService } from './../common/services/http-util.service';
import { Track, TrackInfo } from './track.model';


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../search-component/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  URL: string = '/api/v1/music/artists';

  constructor(private httpUtil: HttpUtilService) { }

  public getTracksStream(artistId: string, albumId: string): Observable<Track[]> {
    const TRACKS_URL: string = `${this.URL}/${artistId}/albums/${albumId}/tracks`;
    const httpParams: HttpParams = new HttpParams().set('id_artist', artistId);
    return this.httpUtil.get<ApiResponse>(TRACKS_URL, httpParams).pipe(map(response => {
      const trackInfo: TrackInfo = response.result as TrackInfo;
      return trackInfo.tracks as Track[];
    } ));
  }

  public getTrackStream(artistId: string, albumId: string, trackId: string): Observable<Track> {
    const TRACK_URL: string = `${this.URL}/${artistId}/albums/${albumId}/${trackId}`;
    const httpParams: HttpParams = new HttpParams().set('id_artist', artistId).append('id_album', albumId).append('id_track', trackId);
    return this.httpUtil.get<ApiResponse>(TRACK_URL, httpParams).pipe(map(response => response.result as Track));
  }
}
