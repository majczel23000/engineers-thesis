import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleModel } from '../../shared/models/Role.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  roleId: string = undefined;
  role: RoleModel = null;

  editRoleFormGroup: FormGroup;

  get control() {
    return this.editRoleFormGroup.controls;
  }

  matcher = new MyErrorStateMatcher();

  constructor(private activatedRoute: ActivatedRoute,
              private roleService: RoleService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getRoleById();
  }

  getRoleById(): void {
    this.roleId = this.activatedRoute.snapshot.paramMap.get('id');
    this.roleService.getRoleById(this.roleId).subscribe(
      res => {
        this.role = res.data;
        this.editRoleFormGroup = new FormGroup({
          name: new FormControl(this.role.name, [ Validators.required, Validators.minLength(6) ]),
          description: new FormControl(this.role.description, [ Validators.required])
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  clearChanges(): void {
    this.editRoleFormGroup.controls.name.setValue(this.role.name);
    this.editRoleFormGroup.controls.description.setValue(this.role.description);
  }

  editRole(): void {
    this.roleService.updateRole(this.roleId, this.editRoleFormGroup.value).subscribe(
      res => {
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
