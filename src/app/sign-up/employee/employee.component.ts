import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ShowHideService} from 'ngx-show-hide-password';
import {UserService} from '../../../services/api-service/user.service';
import {AuthenticationService} from '../../../services/data-service/authentication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  user = this.formBuilder.group({
    userName: '',
    firstName: '',
    lastName: '',
    email: ['', Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )],
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
