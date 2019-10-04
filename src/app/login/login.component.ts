import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService, UserService } from '../_services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService,
        private user: UserService,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    onSubmit() {
        if (this.loginForm.invalid) {
            this.openSnackBar('Please fill all details', '');
        } else {
            this.auth.login(this.loginForm.value).subscribe((res: any) => {
                if (res.success === true) {
                    const userInfo = res.data[0];
                    localStorage.setItem('loggedUser_id', userInfo.user_id);
                    localStorage.setItem('loggedUser_name', userInfo.first_name);
                    localStorage.setItem('loggedUser_type', userInfo.user_type);
                    this.auth.setLoggedInfo(true);
                    this.auth.setUserType(userInfo.user_type);
                    this.auth.setUserId(userInfo.user_id);
                    this.auth.setUserName(userInfo.first_name);
                    this.router.navigate(['home']);
                    this.openSnackBar(res.message, '');
                } else {
                    this.openSnackBar(res.message, '');
                }
            }, (err) => {
                this.openSnackBar('Server error', '');
            });
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: ['red-snackbar'],
        });
    }
}
