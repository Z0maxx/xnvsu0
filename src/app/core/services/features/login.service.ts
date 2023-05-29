import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private router: Router) { }

  userId = '';
  
  get isLoggedIn() {
    return this.userId != '';
  }

  login(username: string, password: string) {
    if (username == 'zoli' && password == 'z0li') {
      this.userId = 'adminUserId';
      return true;
    }
    return false;
  }

  logout() {
    this.userId = '';
    this.router.navigate(['login']);
  }
}
