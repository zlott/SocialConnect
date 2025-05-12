import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './_interceptors/auth.interceptor'; // Ajustez le chemin si nécessaire

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Active les intercepteurs depuis le DI
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Enregistre l'intercepteur
  ]
};
