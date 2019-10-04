import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services';
import { MatSnackBar, MatDialogRef } from '@angular/material';
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
      private auth: AuthenticationService,
      private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          usertype: ['', Validators.required]
      });
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        this.openSnackBar('please fill all details', '');
      } else {
        this.auth.register(this.registerForm.value).subscribe((res: any) => {
          if (res.success === true) {
            this.openSnackBar(res.message, '');
            this.closeDialog();
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

  closeDialog() {
    this.dialogRef.close();
  }

}
