import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/data-service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  loggedIn = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  loginAsGuest(): void {
    this.loggedIn = this.authService.loginAsGuest();
    if (this.loggedIn) {
      this.router.navigate(['home']);
    }
    else {
      this.router.navigate(['login']);
    }
  }
}
