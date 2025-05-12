import { Routes } from '@angular/router';
import { AuthGuard } from './_services/auth.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: '', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent), canActivate: [AuthGuard] },
    { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent), canActivate: [AuthGuard] },
    { path: 'users/:id', loadComponent: () => import('./user-details/user-details.component').then(m => m.UserDetailsComponent), canActivate: [AuthGuard] },
    { path: 'likes', loadComponent: () => import('./favorites/favorites.component').then(m => m.FavoritesComponent), canActivate: [AuthGuard] },
    { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
    { path: '**', redirectTo: 'users' } // Utilise LogoutGuard pour la redirection par défaut
];
