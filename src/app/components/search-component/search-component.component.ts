import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Artist } from '../artist/artist.model';
import { Song } from '../song/song.model';
import { SearchType } from './../../common/enums/search-type.enum';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html'
})
export class SearchComponentComponent {

  readonly MAX_QUERY_LENGTH: number = 25;
  readonly MIN_QUERY_LENGTH: number = 3;
  readonly SEARCH_TYPE = SearchType;

  @Output()
  private selectedItem: EventEmitter<string> = new EventEmitter<string>();
  songs: Observable<Set<Song>>;
  artists: Observable<Set<Artist>>;
  query: string;
  show: boolean = false;
  placeholder: string = 'search by song title..';
  searchCriteria: SearchType = SearchType.Title; // default is Title

  constructor(
    private searchService: SearchService
  ) { }

  public getResults(): void {
    if (!this.query || this.query.length < this.MIN_QUERY_LENGTH || this.query.length > this.MAX_QUERY_LENGTH ){
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

  emitSelectedItem(url: string): void {
    this.selectedItem.emit(url);
  }
}
