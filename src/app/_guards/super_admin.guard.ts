import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SuperAuthGuard implements CanActivate {


    canActivate() {
        if (localStorage.getItem('loggedUser_type') === 'SuperAdmin') {
            // logged in so return true
            return true;
        }
    }
}
