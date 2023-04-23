import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private router: Router) {}

  canMatch(userId: string): boolean {
    /*if (userId == 'adminUserId') return true;
    this.router.navigate(['login']);
    return false;*/
    return true;
  }
}