import { AlbumInfo } from './../song/song-info.model';


import { HttpUtilService } from './../common/http-util.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../search-component/api-response.model';
import { Album } from '../song/song-info.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  URL: string = '/api/v1/music/artists';

  constructor(private httpUtil: HttpUtilService) { }

  public getAlbumsStream(artistId: number): Observable<AlbumInfo> {
    const ALBUMS_URL: string = `${this.URL}/${artistId}/albums`;
    const httpParams: HttpParams = new HttpParams().set('id_artist', artistId.toString());
    return this.httpUtil.get<ApiResponse>(ALBUMS_URL, httpParams)
                                            .pipe(map(response => response.result as AlbumInfo));
  }

  public getAlbumStream(artistId: number, albumId: number): Observable<Album> {
    const ALBUM_URL: string = `${this.URL}/${artistId}/albums/${albumId}`;
    const httpParams: HttpParams = new HttpParams().set('id_artist', artistId.toString()).append('id_album', albumId.toString());
    return this.httpUtil.get<ApiResponse>(ALBUM_URL, httpParams).pipe(map(response => response.result as Album));
  }
}
