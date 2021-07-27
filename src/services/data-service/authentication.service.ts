import { Injectable } from '@angular/core';
import {UserService} from '../api-service/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn = false;
  showLoginModal = '';
  user = {
    userName: '',
    userType: '',
    userId: '',
    authToken: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  loginAsGuest(): boolean {
    if (!this.loggedIn) {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', String(true));
    }
    return this.loggedIn;
  }

  signUp(user: any): any {
    user.userType = this.user.userType;
    console.log(user);
    if (user.password == user.confirmPassword) {
      this.userService.createNewUser(user).subscribe((response) => {
          console.log(response);
          if (response.status == 'success') {
            this.redirect('login');
          }
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      return  '* Password did not match';
    }
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }

}
