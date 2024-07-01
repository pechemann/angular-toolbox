import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DARK_MODE_CONFIG } from 'angular-toolbox';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    { provide: DARK_MODE_CONFIG, useValue: { detectBrowserSettings: false, storageKey: "http-mocking-sample-dark-mode" } }
  ]
};
