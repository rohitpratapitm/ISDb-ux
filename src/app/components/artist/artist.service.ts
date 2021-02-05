


import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../search-component/api-response.model';
import { ArtistInfo, Artist } from '../song/song-info.model';
import { HttpUtilService } from 'src/app/common/services/http-util.service';

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

  public getArtistStream(id: number): Observable<Artist> {
    const ARTIST_URL: string = `${this.URL}/${id}`;
    const httpParams: HttpParams = new HttpParams().set('id_artist', id.toString());
    return this.httpUtil.get<ApiResponse>(ARTIST_URL, httpParams).pipe(map(response => response.result as Artist));
  }
}
