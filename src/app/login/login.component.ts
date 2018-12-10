import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
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
      private snackBar: MatSnackBar) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });

      // reset login status
      // this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.openSnackBar('Please fill all details', '');
    } else {
      this.user.login(this.loginForm.value).then((res: any) => {
        if (res.success === true) {
          this.openSnackBar(res.message, '');
          localStorage.setItem('loggedUser', res.data[0].user_id);
          localStorage.setItem('loggedUser_name', res.data[0].first_name);
         this.auth.getLoggedInfomethod(true);
         this.router.navigate(['home']);
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
