import { Observable } from 'rxjs/internal/Observable';
import { SearchType } from './../../common/enums/search-type.enum';
import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Artist } from '../artist/artist.model';
import { Song } from '../song/song.model';
import { ArtistProxy } from '../artist/artist.service';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {

  readonly MAX_QUERY_LENGTH: number = 25;
  readonly MIN_QUERY_LENGTH: number = 3;
  readonly SEARCH_TYPE = SearchType;

  songs: Observable<Song[]>;
  artists: Observable<Artist[]>;
  query: string;
  show: boolean = false;
  placeholder: string = 'search by song title..';
  searchCriteria: SearchType = SearchType.Title; // default is Title

  constructor(
    private searchService: SearchService,
    private artistService: ArtistProxy,
  ) { }

  public getResults(): void {
    if (!this.query){
      return;
    }
    if (this.searchCriteria === SearchType.Title) {
      this.songs = this.searchService.searchSongsStream(this.query);
    }
    else if (this.searchCriteria === SearchType.Artist) {
       this.artists = this.searchService.searchArtistsStream(this.query);
    }
  }

  setSearchPlaceholder(searchType: SearchType): void {
    this.searchCriteria = searchType;
    this.placeholder =
      searchType === SearchType.Title
        ? 'search by song title..'
        : 'search by artist name';
  }
}
