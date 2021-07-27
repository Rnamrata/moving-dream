import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../../services/data-service/authentication.service';
import {Router} from '@angular/router';
import {ShowHideService} from 'ngx-show-hide-password';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {UserService} from '../../services/api-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loggedIn = false;
  isHidden = true;
  error = '';
  userTypes = [
    {typeName: 'customer', checked: false},
    {typeName: 'employee', checked: false}
  ];

  user = this.formBuilder.group({
    userName: ['', [Validators.required]],
    userType: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    private router: Router,
    private showHideService: ShowHideService,
    private userService: UserService
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

  selectUserType(type: any): void {
    this.error = '';
    this.userTypes.forEach((element) => {
      element.checked = element.typeName == type.typeName;
    });
    this.user.controls.userType.setValue(type.typeName);
    this.authService.user.userType = this.user.get('userType')?.value;
  }

  async loginAsUser(): Promise<void> {
    if (this.user.get('userName')?.valid &&
      this.user.get('userType')?.valid &&
      this.user.get('password')?.valid
    ) {
      const body = {
        userName: this.user.get('userName')?.value,
        userType: this.user.get('userType')?.value,
        userPassword: this.user.get('password')?.value
      };
      try{
        const userData = await this.userService.loginWithPassword(body).toPromise();
        this.error = '';
        this.loggedIn = true;
        this.authService.user.userName = this.user.get('userName')?.value;
        this.authService.user.userId = userData.response.userId;
        this.authService.user.authToken = userData.response.accessToken;
        // console.log(this.authService.user);
        this.authService.loggedIn = this.loggedIn;
        this.redirect();
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      this.error = '* User type, info or password missing';
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

  createNewUser(): void {
    if (this.user.get('userType')?.valid) {
      this.authService.loggedIn = true;
      this.router.navigate(['signUp']);
    }
    else {
      this.error = '* Select user type';
    }
  }

  ngOnDestroy(): void {}
}
