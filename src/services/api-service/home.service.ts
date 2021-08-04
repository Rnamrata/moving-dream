import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserService} from './user.service';
import {AuthenticationService} from '../data-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthenticationService

  ) { }

  getAllProducts(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authService.user.authToken
    });
    return this.http.post(environment.apiUrlWithVersion + '/getAllProducts', body, {headers});
  }
}
