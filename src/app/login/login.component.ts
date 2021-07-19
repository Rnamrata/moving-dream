import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../../services/data-service/authentication.service';
import {Router} from '@angular/router';
import {ShowHideService} from 'ngx-show-hide-password';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loggedIn = false;
  isHidden = true;
  error = '';
  user = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private showHideService: ShowHideService
  ) {
    this.showHideService
      .getObservable('password1')
      .pipe(untilDestroyed(this))
      .subscribe(show => {
        this.isHidden = !show;
      });
  }

  ngOnInit(): void {
  }

  loginAsUser(): void {
    if (this.user.get('userName')?.valid && this.user.get('password')?.valid) {
      this.error = '';
      this.loggedIn = true;
      this.authService.user.userName = this.user.get('userName')?.value;
      console.log(this.user);
      this.authService.loggedIn = this.loggedIn;
      this.redirect();
    }
    else {
      this.error = '* User info or password missing';
    }
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

  ngOnDestroy(): void {}
}
