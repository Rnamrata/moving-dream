import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/data-service/authentication.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log('in sign up');
  }

}
