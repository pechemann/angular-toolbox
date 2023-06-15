import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DarkModeServiceComponent } from './dark-mode-service/dark-mode-service.component';

const routes: Routes = [
  {
    path: 'dark-mode-service', component: DarkModeServiceComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
