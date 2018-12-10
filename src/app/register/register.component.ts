import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService } from '../_services';
import { User } from '../_models';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private auth: AuthenticationService,
      private snackBar: MatSnackBar) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        this.openSnackBar('please fill all details', '');
      } else {
        this.auth.login(this.registerForm.value).then((res: any) => {
          if (res.success === true) {
            this.openSnackBar(res.message, '');
            this.router.navigate(['login']);
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
