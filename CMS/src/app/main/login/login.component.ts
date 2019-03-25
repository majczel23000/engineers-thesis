import { Component } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  get control() {
    return this.loginFormGroup.controls;
  }

  loginFormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email,]),
    password: new FormControl('', [ Validators.required])
  })

  matcher = new MyErrorStateMatcher();

  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    if (this.loginFormGroup.valid) {
      this.loginService.loginUser(this.loginFormGroup.value).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
          this.loginService.setToken(res.data.token);
        },
        (err) => {
          console.log(err.error);
        }
      )
    }
  }

}
