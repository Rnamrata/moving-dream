import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../../services/data-service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  loggedIn = false;
  user = this.formBuilder.group({
    userName: '',
    password: ''
  });

  ngOnInit(): void {
  }

  loginAsUser(): void {
    this.loggedIn = true;
    this.authService.user.userName = this.user.get('userName')?.value;
    console.log(this.authService.user);
    this.authService.loggedIn = this.loggedIn;
    this.redirect();
  }

  loginAsGuest(): void {
    this.loggedIn = this.authService.loginAsGuest();
    this.redirect();
  }

  redirect(): void {
    if (this.loggedIn) {
      this.router.navigate(['home']);
    }
    else {
      this.router.navigate(['login']);
    }
  }
}
