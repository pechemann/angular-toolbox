import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./component/resources/resources.component').then(mod => mod.ResourcesComponent)
  },
  {
    path: "documentation/:id",
    loadComponent: () => import('./component/documentation/documentation.component').then(mod => mod.DocumentationComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
