import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanEnterTabsPageGuard implements CanActivate {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router ) {

  }
  // This canActivate function is called in the tabs-routing.module.ts as canActivate: [CanEnterTabsPageGuard]
  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot) {
    return this.angularFireAuth.authState.pipe(
      map((auth) => {
        if (!auth) { // means if there is no authentification details then navigate to login page
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
  
  
}
