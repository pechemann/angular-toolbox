import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DarkModeServiceComponent } from './dark-mode-service/dark-mode-service.component';
import { ScrollServiceComponent } from './scroll-service/scroll-service.component';

const routes: Routes = [
  { path: 'dark-mode-service', component: DarkModeServiceComponent },
  { path: 'scroll-service', component: ScrollServiceComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
