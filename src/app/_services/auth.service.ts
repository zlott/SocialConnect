import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  login(email: string, password: string): boolean {
    console.log('Login called with email:' + email);
    localStorage.setItem('token', 'email'); // Exemple : vérifiez un token
    return true;
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const authenticated = !!localStorage.getItem('token'); // Exemple : vérifiez un token
    return authenticated;
  }
  
  getUsersApiToken() {
    return 'reqres-free-v1';
  }

}
