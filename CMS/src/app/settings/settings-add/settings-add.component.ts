import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material';
import { SettingsService } from '../services/settings.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-settings-add',
  templateUrl: './settings-add.component.html',
  styleUrls: ['./settings-add.component.css']
})
export class SettingsAddComponent implements OnInit {

  get control(): { [key: string]: AbstractControl }  {
    return this.addSettingFormGroup.controls;
  }

  addSettingFormGroup = new FormGroup({
    code: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
    name: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
    description: new FormControl('')
  });

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private settingsService: SettingsService) { }

  ngOnInit() {
  }

  addSetting(): void {
    if (this.addSettingFormGroup.valid) {
      this.settingsService.addSetting(this.addSettingFormGroup.value).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/settings']);
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
