import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { HttpUtilService } from '../../common/services/http-util.service';

/**
 * This class loads lyrics information from lyrics html page
 */
@Injectable({ providedIn: 'root' })
export class LyricsService {

    readonly ROOT_CONTEXT: string = '/genius-lyrics';

    constructor(private httpUtilService: HttpUtilService) { }

    /**
     * This method load the lyrics html page and then extracts the lyrics out of it
     * @param lyricsPath url of lyrics page
     * @returns observable stream of string(lyrics)
     */
    public getLyricsStream(lyricsPath: string): Observable<string> {
        return this.httpUtilService.getTextHTML(`${this.ROOT_CONTEXT}${lyricsPath}`)
            .pipe(
                map((data: string) => this.parseData(data)),
                catchError(() => {
                    return throwError('getLyricsStream service failed');
                })
            );
    }

    /**
     * This method parses the html document and derives the lyrics information from it
     * @param htmlContent html document
     * @returns lyrics
     */
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


