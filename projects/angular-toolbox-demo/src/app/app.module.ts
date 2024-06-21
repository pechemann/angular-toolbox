import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-layout/app.component';
import { AngularToolboxModule, DARK_MODE_CONFIG, VERSION_CONFIG } from 'angular-toolbox';
import { XhrFactory } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { httpMockFactory } from 'projects/angular-toolbox/src/lib/framework';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: XhrFactory, useFactory: httpMockFactory },
    { provide: DARK_MODE_CONFIG, useValue: DARK_MODE_CONFIG },
    { provide: VERSION_CONFIG, useValue: { major: 0, minor: 1, patch: 4, buildTimestamp: 1718620817645 } },
    provideHttpClient(),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularToolboxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
