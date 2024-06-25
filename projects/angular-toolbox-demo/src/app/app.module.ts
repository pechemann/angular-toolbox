import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-layout/app.component';
import { DARK_MODE_CONFIG, VERSION_CONFIG, httpMockFactory } from 'angular-toolbox';
import { XhrFactory } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: XhrFactory, useFactory: httpMockFactory },
    { provide: DARK_MODE_CONFIG, useValue: DARK_MODE_CONFIG },
    //--> Angular Toolbox lib version
    { provide: VERSION_CONFIG, useValue: { major: 0, minor: 1, patch: 4, buildTimestamp: 1718620817645 } },
    provideHttpClient(),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
