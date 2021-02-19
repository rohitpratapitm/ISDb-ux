import {
  ApiResponseWrapper,
  HttpStatusCode,
  ArtistResponse,
  ApiArtistResponse,
  Description,
  PropertyChildrenContainer,
  AttributeChild,
  PropertyChildren,
} from './artist-api-response.model';
import { Injectable } from '@angular/core';
import { HttpUtilService } from 'src/app/common/services/http-util.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Artist } from './artist.model';
import { Song } from '../song/song.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistProxy {
  URL: string = '/genius-api/artists';

  constructor(private httpUtil: HttpUtilService) {}

  public getArtistStream(id: number): Observable<Artist> {
    const ARTIST_URL: string = `${this.URL}/${id}`;
    return this.httpUtil.get<ApiResponseWrapper>(ARTIST_URL).pipe(
      map((artistApiResponseWrapper) => {
        const artist: Artist = {};
        if (
          artistApiResponseWrapper &&
          artistApiResponseWrapper.meta.status === HttpStatusCode.SUCCESS
        ) {
          const artistApiResponse: ApiArtistResponse = artistApiResponseWrapper.response as ApiArtistResponse;
          const artistResponse: ArtistResponse = artistApiResponse.artist;
          artist.fullName = artistResponse.name;
          artist.id = artistResponse.id;
          artist.bio = this.getBio(artistResponse.description);
        }
        return artist;
      })
    );
  }
  
  getBio(description: Description): string {
    let bio: string = '';
    description.dom.children.forEach((child) => {
      if (child && child.children && child.children.length) {
        child.children.forEach((grandChild) => {
          if (grandChild && typeof grandChild === 'string') {
            bio = bio.concat(grandChild as string);
          } else if (typeof grandChild === 'object') {
            const properterChildernContainer: PropertyChildrenContainer = grandChild as PropertyChildrenContainer;
            if (properterChildernContainer.tag === 'a') {
              const attributeChildren: AttributeChild[] =
                properterChildernContainer.children;
              if (attributeChildren && attributeChildren.length) {
                attributeChildren.forEach((attributeChild) => {
                  if (
                    attributeChild &&
                    attributeChild.children &&
                    attributeChildren.length
                  ) {
                    if (attributeChild.children.tag === 'em') {
                      const propertyChildren: PropertyChildren =
                        attributeChild.children;
                      if (
                        propertyChildren.children &&
                        propertyChildren.children.length
                      ) {
                        propertyChildren.children.forEach((propertyChild) => {
                          if (typeof propertyChild === 'string') {
                            bio = bio.concat(propertyChild as string);
                          }
                        });
                      }
                    }
                  }
                });
              }
            }
          }
        });
      }
    });
    return bio;
  }
}
