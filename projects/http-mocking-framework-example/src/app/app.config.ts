/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { DARK_MODE_CONFIG, HTTP_MOCKING_FRAMEWORK_CONFIG, httpMockFactory, HttpMockProductionPolicy } from 'projects/angular-toolbox/src/public-api';
import { XhrFactory } from '@angular/common';


const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes, withInMemoryScrolling(scrollConfig)),
    {
      provide: HTTP_MOCKING_FRAMEWORK_CONFIG,
      useValue: { productionPolicy: HttpMockProductionPolicy.SILENT } 
    },
    { provide: XhrFactory, useFactory: httpMockFactory },
    { provide: DARK_MODE_CONFIG, useValue: { detectBrowserSettings: false, storageKey: "http-mocking-sample-dark-mode" } }
  ]
};
