import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  loginWithPassword(body: any): Observable<any> {
    const headers = {};
    return this.http.post(environment.apiUrlWithVersion + '/loginWithPassword', body, {headers});
  }

  createNewUser(body: any): Observable<any> {
    const headers = {};
    return this.http.post(environment.apiUrlWithVersion + '/insertUserInfo', body, {headers});
  }
}
