import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn = false;
  user = {
    userName: ''
  };

  constructor() { }

  loginAsGuest(): boolean {
    if (!this.loggedIn) {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', String(true));
    }
    return this.loggedIn;
  }
}
