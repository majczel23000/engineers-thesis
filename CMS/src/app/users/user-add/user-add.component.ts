import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatCheckbox, MatSnackBar} from '@angular/material';
import { UserService } from '../services/user.service';
import { User } from '../../shared/models/user.model';

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

  roles = [
    {
      name: 'Get all users',
      code: 'USERS/GET_ALL'
    },
    {
      name: 'Get specific user',
      code: 'USERS/GET_ID'
    },
    {
      name: 'Create users',
      code: 'USERS/CREATE'
    },
    {
      name: 'Update users',
      code: 'USERS/UPDATE'
    },
    {
      name: 'Delete users',
      code: 'USERS/DELETE'
    },
    {
      name: 'Get all roles',
      code: 'ROLES/GET_ALL'
    },
    {
      name: 'Get specific role',
      code: 'ROLES/GET_ID'
    },
    {
      name: 'Update roles',
      code: 'ROLES/UPDATE'
    }
  ];

  checkedCheckboxes = [];

  get control() {
    return this.addUserFormGroup.controls;
  }

  addUserFormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
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
      const userData = this.prepareDataToSend();
      this.userService.addUser(userData).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/users']);
          this.snackBar.open(res.message, 'X', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['success-snackbar']
          });
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }

  onCheckboxChange(role, checkbox: MatCheckbox): void {
    if (checkbox.checked) {
      this.checkedCheckboxes.push(role);
    } else {
      for (let i = 0; i < this.checkedCheckboxes.length; i++) {
        if (this.checkedCheckboxes[i] === role) {
          this.checkedCheckboxes.splice(i, 1);
        }
      }
    }
  }

  prepareDataToSend(): User {
    const userData: User = this.addUserFormGroup.value;
    userData.roles = this.checkedCheckboxes;
    return userData;
  }

}
