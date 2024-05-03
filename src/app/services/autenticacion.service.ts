import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor( public ngFireAuth: AngularFireAuth ) { }

  async registerUser(email: string, password: string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // async loginUser(email: string, password: string, rememberMe: boolean = false ){
  //   try {
  //     const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  //     if (rememberMe) {
  //       await this.saveCredentials(email, password);
  //     } else {
  //       await this.removeCredentials();
  //     }
  //     return userCredential.user;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string){
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut(){
    return await this.ngFireAuth.signOut();
  }

  // async getProfile(){
  //   return await this.ngFireAuth.currentUser;
  // }

  saveCredentials(email: string, password: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
  }

  getSavedCredentials() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe && email && password) {
      return { email, password, rememberMe };
    } else {
      return null;
    }
  }

  removeSavedCredentials() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
  }

}
