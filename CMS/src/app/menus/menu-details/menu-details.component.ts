import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogConfirmComponent } from '../../shared/components/dialog-confirm/dialog-confirm.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { MenuModel } from '../../shared/models/menu/Menu.model';
import { MenuElementModel } from '../../shared/models/menu/MenuElement.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {

  menuId: string = undefined;
  menu: MenuModel = null;

  editMenuFormGroup: FormGroup;

  get control() {
    return this.editMenuFormGroup.controls;
  }

  matcher = new MyErrorStateMatcher();

  menuElementsVisibility = false;

  menuElements: MenuElementModel[] = [];

  maxMenuLevel = 0;
  maxLevels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: Router,
              private menuService: MenuService) { }

  ngOnInit() {
    this.getMenuById();
  }

  getMenuById(): void {
    this.menuId = this.activatedRoute.snapshot.paramMap.get('id');
    this.menuService.getMenuById(this.menuId).subscribe(
      res => {
        this.menu = res.data;
        this.cloneElements();
        this.editMenuFormGroup = new FormGroup({
          name: new FormControl(this.menu.name, [ Validators.required, Validators.minLength(5)]),
          description: new FormControl(this.menu.description)
        });
        this.displayEveryElementsArray(this.menuElements, true, 0);
        this.maxMenuLevel = Math.max.apply(Math, this.maxLevels);
      },
      err => {
        console.log(err);
      }
    );
  }

  cloneElements(): void {
    this.menuElements = [];
    for (let i = 0; i < this.menu.elements.length; i++) {
      this.menuElements[i] = this.menu.elements[i];
    }
  }

  clearChanges(): void {
    this.editMenuFormGroup.controls.name.setValue(this.menu.name);
    this.editMenuFormGroup.controls.description.setValue(this.menu.description);
    this.cloneElements();
  }

  changeStatus(): void {
    if (this.menu.status !== 'DELETED') {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '40%',
        data: {
          title: 'Change status',
          description: 'Are you sure you want to change status of this menu?',
          action: 'CHANGE_MENU_STATUS',
          status: this.menu.status,
          _id: this.menuId,
          code: this.menu.code
        }
      });
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.getMenuById();
        }
      });
    }
  }

  removeMenu(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '40%',
      data: {
        title: 'Remove menu',
        description: 'Are you sure you want to remove this menu?',
        action: 'REMOVE_MENU',
        status: 'DELETED',
        _id: this.menuId
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.router.navigate(['/menus']);
      }
    });
  }

  editMenu(): void {
    if (this.editMenuFormGroup.valid) {
      this.menuService.editMenu(this.menuId, this.editMenuFormGroup.value).subscribe(
        res => {
          this.snackBar.open(res.message, 'X', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['success-snackbar']
          });
          this.menu = res.data;
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

  displayEveryElementsArray(elements: MenuElementModel[], status: boolean, k: number): void {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].children && elements[i].children.length) {
        if (status) {
          this.maxLevels[i] += 1;
          this.displayEveryElementsArray(elements[i].children, false, i);
        } else {
          this.maxLevels[k] += 1;
          this.displayEveryElementsArray(elements[i].children, false, k);
        }
      }
    }

  }
}
