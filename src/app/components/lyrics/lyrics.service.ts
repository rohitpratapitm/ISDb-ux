import { Injectable } from "@angular/core";
import { HttpUtilService } from '../../common/services/http-util.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class LyricsService {

    readonly ROOT_CONTEXT: string = '/genius-lyrics';

    constructor(private httpUtilService: HttpUtilService) {}

    public getLyricsStream(lyricsPath: string): Observable<string> {
        return this.httpUtilService.getTextHTML(`${this.ROOT_CONTEXT}${lyricsPath}`).pipe(map((data:string) => this.parseData(data)));
    }

    public parseData(htmlContent: string): string {
        try {
            let parser = new DOMParser();
            const root = parser.parseFromString(htmlContent, 'text/html');
            const lyrics = root.getElementsByTagName('routable-page')[0].getElementsByClassName('lyrics')[0].getElementsByTagName('p')[0].innerText;
            return lyrics;
        } catch (e) {
            console.log('Unable to parse document.');
            console.log(e.message);
            return 'No Lyrics found.'
        }
    }
}


