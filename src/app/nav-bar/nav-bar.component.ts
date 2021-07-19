import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, Event as NavigationEvent,} from '@angular/router';
import {AuthenticationService} from '../../services/data-service/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  hideNavBar = false;
  user = '';
  
  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    console.log(this.authService.user.userName);
    this.setUser();
    this.checkRoute();
  }

  setUser(): void {
    this.user = this.authService.user.userName != '' ? this.authService.user.userName : '';
  }

  checkRoute(): void {
    this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          this.hideNavBar = this.router.url.includes('/login');
        }
      }
    );
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}
