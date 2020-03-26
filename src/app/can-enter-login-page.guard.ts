import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanEnterLoginPageGuard implements CanActivate {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router ) {

  }

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot) {
    return this.angularFireAuth.authState.pipe(
      map((auth) => {
        if (auth) {
          this.router.navigate(['/tabs']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
  
}
