import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataModel } from '../../models/DialogData.model';
import { UserService } from '../../../users/services/user.service';
import { MatSnackBar } from '@angular/material';
import { RoleService } from '../../../roles/services/role.service';
import { FaqService } from '../../../faqs/services/faq.service';
import { MenuService } from '../../../menus/services/menu.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent {

  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataModel,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private roleService: RoleService,
              private faqService: FaqService,
              private menuService: MenuService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    switch (this.data.action) {
      case 'CHANGE_STATUS': {
        if (this.data.status === 'INACTIVE') {
          this.userService.activateUser(this.data._id).subscribe(
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
        } else {
          this.userService.deactivateUser(this.data._id).subscribe(
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
        break;
      }
      case 'REMOVE_USER': {
        this.data.status = 'REMOVED';
        this.userService.removeUser(this.data._id).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        break;
      }
      case 'CHANGE_ROLE_STATUS': {
        console.log(this.data._id);
        if (this.data.status === 'INACTIVE') {
          this.roleService.activateRole(this.data._id, this.data.code).subscribe(
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
        } else {
          this.roleService.deactivateRole(this.data._id, this.data.code).subscribe(
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
        break;
      }
      case 'CHANGE_FAQ_STATUS': {
        console.log(this.data._id);
        if (this.data.status === 'INACTIVE') {
          this.faqService.activateFaq(this.data._id).subscribe(
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
        } else {
          this.faqService.deactivateFaq(this.data._id).subscribe(
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
        break;
      }
      case 'REMOVE_FAQ': {
        this.data.status = 'REMOVED';
        this.faqService.removeFaq(this.data._id).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        break;
      }
      case 'CHANGE_MENU_STATUS': {
        if (this.data.status === 'INACTIVE') {
          this.menuService.activateMenu(this.data._id).subscribe(
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
        } else {
          this.menuService.deactivateMenu(this.data._id).subscribe(
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
        break;
      }
      case 'REMOVE_MENU': {
        this.data.status = 'REMOVED';
        this.menuService.removeMenu(this.data._id).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        break;
      }
    }
  }

}
