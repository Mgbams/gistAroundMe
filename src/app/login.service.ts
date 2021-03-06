import { LoginCredential } from './types';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  login(credentials: LoginCredential): Promise<any> {
    return this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }
}
