import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/index';


@Injectable()
export class AuthGuard implements CanActivate {
    private allowedAnon:Array<String>
    constructor(private router: Router, private authenticationService: AuthenticationService,) {
        this.allowedAnon = ["", "/about", "/support", "/contact"];
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            if (state.url == "/") {
                 this.router.navigate(['/dashboard']);
            }
            return true;
        }
        if (this.allowedAnon.filter(value => value==state.url)) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}