import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/features/login.service';
import { SnackbarCallerService } from 'src/app/core/services/snackbar-caller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private snackbarCaller: SnackbarCallerService
  ) {}

  protected loginForm!: FormGroup;

  protected get isLoggedIn() {
    return this.loginService.isLoggedIn;
  }
  protected get userId() {
    return this.loginService.userId;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(
        '',
        {
          validators: [
            Validators.required
          ]
        }
      ),
      password: new FormControl(
        '',
        {
          validators: [
            Validators.required
          ]
        }
      )
    })
  }

  protected login() {
    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value
    if (!this.loginService.login(username, password)) {
      this.snackbarCaller.failure('Incorrect Username or Password');
    }
    this.loginForm.reset();
  }

  logout() {
    this.loginService.logout();
  }
}
