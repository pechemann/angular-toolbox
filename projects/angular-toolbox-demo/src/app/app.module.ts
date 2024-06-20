import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-layout/app.component';
import { AngularToolboxModule } from 'angular-toolbox';
import { XhrFactory } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { xhrProxyFactory } from 'projects/angular-toolbox/src/lib/framework';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: XhrFactory, useFactory: xhrProxyFactory },
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
