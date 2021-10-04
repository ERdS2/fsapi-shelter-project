import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(){
    const user = this.authService.getUserAuthData()
    const isAdmin = user && user.role == 'admin';
    return isAdmin;
  }
}
