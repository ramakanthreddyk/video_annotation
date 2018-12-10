import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
    private logged: Boolean;

    constructor(private router: Router, private auth: AuthenticationService) {}
    ngOnInit() {
        this.auth.getLoggedInfo.subscribe((val) => {
            this.logged = val;
        });
        if (localStorage.getItem('loggedUser')) {
            // logged in so return true
            this.auth.getLoggedInfomethod(true);
        }
    }
    private logout() {
      // clear localstorage
        localStorage.clear();
        this.auth.getLoggedInfomethod(false);
        this.router.navigate(['login']);
    }
    private login() {
        this.router.navigate(['login']);
    }

    ngOnDestroy() {}
}
