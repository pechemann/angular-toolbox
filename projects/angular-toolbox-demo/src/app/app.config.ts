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
import { DARK_MODE_CONFIG, HTTP_MOCKING_FRAMEWORK_CONFIG, VERSION_CONFIG, httpMockFactory } from 'projects/angular-toolbox/src/public-api';
import { provideHttpClient } from '@angular/common/http';
import { XhrFactory } from '@angular/common';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withInMemoryScrolling(scrollConfig)),
    { provide: HTTP_MOCKING_FRAMEWORK_CONFIG, useValue: { disableVisualFlag: false } },
    { provide: XhrFactory, useFactory: httpMockFactory },
    { provide: DARK_MODE_CONFIG, useValue: { detectBrowserSettings: false, storageKey: "angular-toolbox-dark-mode" } },
    //--> Angular Toolbox lib version
    { provide: VERSION_CONFIG, useValue: { major: 1, minor: 0, patch: 0, buildTimestamp: 1720940519299 } },
    provideHttpClient()
  ]
};
