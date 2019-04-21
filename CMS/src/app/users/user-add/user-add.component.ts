import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  get control() {
    return this.addUserFormGroup.controls;
  }

  addUserFormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [ Validators.required]) 
  });

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private userService: UserService) { }

  ngOnInit() {
  }

  addUser(): void {
    if (this.addUserFormGroup.valid) {
      this.userService.addUser(this.addUserFormGroup.value).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/users']);
          this.snackBar.open(res.message, 'X', {
            duration: 5000,
            horizontalPosition: "right",
            panelClass: ['success-snackbar']
          });
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }

}
