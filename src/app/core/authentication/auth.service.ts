import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public isLoggedIn: boolean;
  public redirectUrl: string;

  constructor(
    private router: Router) {
  }

  login() {
    this.isLoggedIn = true;
    if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }
}
