import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Admins } from './_models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
    logged: Boolean;
    userName: BehaviorSubject<string>;
    userType: BehaviorSubject<Admins>;

    constructor(private router: Router, private auth: AuthenticationService) {

        this.userType = this.auth.userType;
        this.userName = this.auth.userName;
    }

    ngOnInit() {
        this.auth.getLoggedInfo.subscribe((val) => {
            this.logged = val;
        });

        if (localStorage.getItem('loggedUser_name')) {
            // logged in so return true
            this.auth.setLoggedInfo(true);
            this.auth.setUserType(localStorage.getItem('loggedUser_type'));
            this.auth.setUserName(localStorage.getItem('loggedUser_name'));
            this.auth.setUserId(localStorage.getItem('loggedUser_id'));
        }
    }

    logout() {
      // clear localstorage
        localStorage.clear();
        this.auth.setLoggedInfo(false);
        this.router.navigate(['login']);
    }

    login() {
        this.router.navigate(['login']);
    }

    selectedMenu(event: any) {
        // console.log(event);
    }

    ngOnDestroy() {}
}
