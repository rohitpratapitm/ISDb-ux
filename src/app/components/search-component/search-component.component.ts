import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Artist } from '../artist/artist.model';
import { Song } from '../song/song.model';
import { SearchType } from './../../common/enums/search-type.enum';
import { SearchService } from './search.service';

/**
 * This component is responsible for showing the search box along with search dropdown.
 * It queries the backend APIs for a given input.
 */
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html'
})
export class SearchComponentComponent {

  readonly MAX_QUERY_LENGTH: number = 25;
  readonly MIN_QUERY_LENGTH: number = 3;
  readonly SEARCH_TYPE = SearchType;

  @Output()
  private selectedSong: EventEmitter<Song> = new EventEmitter<Song>();
  @Output()
  private selectedArtist: EventEmitter<Artist> = new EventEmitter<Artist>();
  songs: Observable<Set<Song>>;
  artists: Observable<Set<Artist>>;
  query: string;
  showResults: boolean = true;
  placeholder: string = 'search by song title..';
  searchCriteria: SearchType = SearchType.Title; // default is Title

  constructor(
    private searchService: SearchService
  ) { }

  /**
   * Fetches results for a given query string.
   * Ensures that query string adheres to minimum and maximum query length validation.
   */
  public getResults(): void {
    if (!this.query || this.query.length < this.MIN_QUERY_LENGTH || this.query.length > this.MAX_QUERY_LENGTH ){
      return;
    }
    this.showResults = true;
    if (this.searchCriteria === SearchType.Title) {
      this.songs = this.searchService.searchSongsStream(this.query);
    }
    else if (this.searchCriteria === SearchType.Artist) {
       this.artists = this.searchService.searchArtistsStream(this.query);
    } else {
      console.warn(`Unknown search criteria type received: ${this.searchCriteria}`);
    }
  }

  /**
   * Sets the placeholder string in the search box
   * @param searchType Any of the search type enum value. Possible values are : Artist and Title
   */
  setSearchPlaceholder(searchType: SearchType): void {
    this.searchCriteria = searchType;
    this.placeholder =
      searchType === SearchType.Title
        ? 'search by song title..'
        : 'search by artist name';
    delete this.query; // reset query to empty
    this.showResults = false;
    if (searchType === SearchType.Title) {
      this.placeholder = 'search by song title..';
      delete this.artists;
      this.emitSelectedSong(undefined); // to hide old results
    } else {
      this.placeholder = 'search by artist name..';
      delete this.songs;
      this.emitSelectedArtist(undefined); // to hide old artist on change of title/artist dropdown
    }
  }

  /**
   * This method emits the selected song
   * @param song song to be emitted
   */
  emitSelectedSong(song: Song): void {
    this.selectedSong.emit(song);
    this.showResults = false;
  }

  /**
   * This method emits the selected artist
   * @param artist artist to be emitted
   */
  emitSelectedArtist(artist: Artist): void {
    this.selectedArtist.emit(artist);
    this.showResults = false;
  }
}
