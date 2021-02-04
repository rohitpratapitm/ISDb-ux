import { HttpUtilService } from './../common/services/http-util.service';


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../search-component/api-response.model';
import { ArtistInfo, Artist } from '../song/song-info.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  // tslint:disable-next-line:no-inferrable-types
  URL: string = '/api/v1/music/artists';

  constructor(private httpUtil: HttpUtilService) { }

  public getArtistsStream(page: number): Observable<ArtistInfo[]> {
    const httpParams: HttpParams = new HttpParams().set('page', page.toString());
    return this.httpUtil.get<ApiResponse>(this.URL, httpParams).pipe(map(response => response.result as ArtistInfo[] ));
  }

  public getArtistStream(id: string): Observable<Artist> {
    const httpParams: HttpParams = new HttpParams().set('id_artist', id);
    return this.httpUtil.get<ApiResponse>(this.URL, httpParams).pipe(map(response => response.result as Artist));
  }
}
