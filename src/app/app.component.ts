import { Component } from '@angular/core';
import {AuthenticationService} from '../services/data-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moving-dream';

  constructor(
    public authService: AuthenticationService
  ) {
  }
}
