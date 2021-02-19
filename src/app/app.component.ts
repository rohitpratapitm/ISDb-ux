import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'ISDb: Search songs and artists';
  
  private url: string;

  constructor(private titleService: Title){
    this.titleService.setTitle(this.title);
  }

  selectedItem(url: string): void {
    this.url = url;
  }
  
  
}