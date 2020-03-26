import { LoginService } from './../login.service';
import { LoginCredential } from './../types';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginFormGroup = formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }

  ngOnInit() {
  }

  login() {
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    this.loginService.login(loginCredentials)
        .then((authData) => {
          this.router.navigate(['/tabs']);
          console.log(authData);
        })
        .catch((authError) => {
          console.log(authError);
        });
  }

}
