import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  private headers: HttpHeaders = new HttpHeaders();
  private params: HttpParams = new HttpParams();

  constructor(private httpClient: HttpClient) {
    this.headers = this.headers.set('x-happi-key', '6ab9e3HDRjbLz3BOjfyJifPt2SYebGjWpH4vsUNp5WXX2Oux2uIgo748');
  }

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    this.params = params;
    return this.httpClient.get<T>(url, {
      headers: this.headers,
      params: this.params
    });
  }
}
