import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router, private alertify: AlertifyService) {    
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // TODO: Validation code here.
    const loggedIn = this.authService.loggedIn();
    if (!loggedIn){
      this.alertify.warning('You must be logged in before accessing this resource.');
      this.router.navigate(['/home']);
    }
    return loggedIn;
  }
}