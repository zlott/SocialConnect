import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, MatProgressSpinnerModule, MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated(); // Vérifie si l'utilisateur est authentifié
  }

}
