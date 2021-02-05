import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  private headers: HttpHeaders = new HttpHeaders();
  private params: HttpParams = new HttpParams();

  constructor(private httpClient: HttpClient) {
    this.headers = this.headers.set('x-happi-key', '6ab9e3HDRjbLz3BOjfyJifPt2SYebGjWpH4vsUNp5WXX2Oux2uIgo748');
    // bd679e162fmsh3b27d1af46c4019p16b649jsneabc33a8416b
  }

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    this.params = params;
    return this.httpClient.get<T>(url, {
      headers: this.headers,
      params: this.params
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
