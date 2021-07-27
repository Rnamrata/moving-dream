import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ShowHideService} from 'ngx-show-hide-password';
import {UserService} from '../../../services/api-service/user.service';
import {AuthenticationService} from '../../../services/data-service/authentication.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  user = this.formBuilder.group({
    userName: '',
    userType: '',
    firstName: '',
    lastName: '',
    phone: '',
    contactFirst: '',
    contactLast: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  error = '';
  isHidden = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private showHideService: ShowHideService,
    private userService: UserService,
    public authService: AuthenticationService
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

  ngOnDestroy(): void {}

  signUp(): void {
    this.error = this.authService.signUp(this.user.value);
  }
}
