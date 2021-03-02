import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnumSelectorComponent } from './common/components/enum-selector/enum-selector.component';
import { SearchCriteriaDropdownComponent } from './components/search-criteria-dropdown/search-criteria-dropdown.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { SongDisplayComponent } from './components/song-display/song-display.component';
import { ArtistDisplayComponent } from './components/artist-display/artist-display.component';
import { InvalidCharactersDirective } from './common/invalid-characters/invalid-characters.directive';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponentComponent,
    EnumSelectorComponent,
    SearchCriteriaDropdownComponent,
    SongDisplayComponent,
    ArtistDisplayComponent,
    InvalidCharactersDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
