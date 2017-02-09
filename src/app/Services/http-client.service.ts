import { Injectable } from '@angular/core';
import {Http, URLSearchParams,} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpClient {
  constructor(private http: Http) { }

  get(url: string, params:URLSearchParams ) {
    return this.http.get(url,  {
      search: params
    }).share()
     .retry(3);
  }
}
