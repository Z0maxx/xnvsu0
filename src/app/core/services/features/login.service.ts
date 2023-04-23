import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

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
  }
}
