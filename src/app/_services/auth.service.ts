import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  login(email: string, password: string): boolean {
    if(email != 'foo@foo.foo' || password != 'foo') {
      return false;
    }
    sessionStorage.setItem('token', email); // Stocke le token dans sessionStorage
    return true;
  }

  logout(): void {
    sessionStorage.removeItem('token'); // Supprime le token de sessionStorage
  }

  isAuthenticated(): boolean {
    const authenticated = !!sessionStorage.getItem('token'); // Vérifie le token dans sessionStorage
    return authenticated;
  }
  
  getUsersApiToken() {
    return 'reqres-free-v1';
  }

}
