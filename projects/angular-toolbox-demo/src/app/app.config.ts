/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DARK_MODE_CONFIG, VERSION_CONFIG, httpMockFactory } from 'projects/angular-toolbox/src/public-api';
import { provideHttpClient } from '@angular/common/http';
import { XhrFactory } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    { provide: XhrFactory, useFactory: httpMockFactory },
    { provide: DARK_MODE_CONFIG, useValue: { detectBrowserSettings: false, storageKey: "angular-toolbox-dark-mode" } },
    //--> Angular Toolbox lib version
    { provide: VERSION_CONFIG, useValue: { major: 0, minor: 7, patch: 0, buildTimestamp: 1719486823542 } },
    provideHttpClient()
  ]
};
