import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
    logged: Boolean;
    user: string;
    userType: BehaviorSubject<string>;

    constructor(private router: Router, private auth: AuthenticationService) {

        this.userType = this.auth.userType;
    }
    ngOnInit() {
        this.auth.getLoggedInfo.subscribe((val) => {
            this.logged = val;
            if (this.logged) {
                this.user = localStorage.getItem('loggedUser_name');
            }
        });

        if (localStorage.getItem('loggedUser_name')) {
            // logged in so return true
            this.auth.getLoggedInfomethod(true);
            this.auth.getUserType(localStorage.getItem('loggedUser_type'));
        }

        this.userType = this.auth.userType;
    }

    logout() {
      // clear localstorage
        localStorage.clear();
        this.auth.getLoggedInfomethod(false);
        this.router.navigate(['login']);
    }
    login() {
        this.router.navigate(['login']);
    }

    selectedMenu(event: any) {
        console.log(event);
    }

    ngOnDestroy() {}
}
