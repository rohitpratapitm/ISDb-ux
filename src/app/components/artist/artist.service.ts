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
import { map } from 'rxjs/operators';
import { Artist } from './artist.model';

/**
 * Singleton service(proxy) to get artist information. 
 */
@Injectable({
  providedIn: 'root',
})
export class ArtistProxy {

  URL: string = '/genius-api/artists';

  constructor(private httpUtil: HttpUtilService) {}

  /**
   * This method fetches artist information for a given artist Id.
   * @param id artist Id
   * @returns Observable stream of Artist information
   */
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
  
  /**
   * This method reads bio information from description object.
   * API keeps bio infomation in embedded objects with links and references.
   * This method drills down and collects all the information from the tree and returns as a single string
   * @param description Description 
   * @returns bio information as a string
   */
  private getBio(description: Description): string {
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
