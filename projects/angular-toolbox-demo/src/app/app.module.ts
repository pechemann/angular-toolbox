import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-layout/app.component';
import { AngularToolboxModule } from 'angular-toolbox';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularToolboxModule
  ],
  /*providers: [
    { provide: DARK_MODE_CONFIG, useValue: { enableDarkMode: true} }
  ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }
