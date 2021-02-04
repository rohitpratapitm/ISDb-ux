import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnumSelectorComponent } from './common/components/enum-selector/enum-selector.component';
import { SearchCriteriaDropdownComponent } from './components/search-criteria-dropdown/search-criteria-dropdown.component';
import { SongDisplayComponent } from './song-display/song-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponentComponent,
    EnumSelectorComponent,
    SearchCriteriaDropdownComponent,
    SongDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
