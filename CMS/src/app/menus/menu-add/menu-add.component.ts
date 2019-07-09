import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material';
import { MenuService } from '../services/menu.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})
export class MenuAddComponent {

  get control() {
    return this.addMenuFormGroup.controls;
  }

  addMenuFormGroup = new FormGroup({
    code: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
    name: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
    description: new FormControl('')
  });

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private menuService: MenuService) { }

  addMenu(): void {
    if (this.addMenuFormGroup.valid) {
      this.menuService.addMenu(this.addMenuFormGroup.value).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/menus']);
          this.snackBar.open(res.message, 'X', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['success-snackbar']
          });
        },
        err => {
          this.snackBar.open(err.error.message, 'X', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }

}
