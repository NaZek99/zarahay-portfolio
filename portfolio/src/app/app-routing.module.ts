import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './component/portfolio/portfolio.component';

const routes: Routes = [
  {
    path:  '', pathMatch: 'full', redirectTo: '/portfolio'
  },
  {
    component: PortfolioComponent,
    path:  'portfolio',
  },
  {
    path:'these', 
    loadComponent: () => import('../app/component/these/these.component').then((m => m.TheseComponent)),
  },
  {
    path:'admin', 
    loadComponent: () => import('../app/component/admin/admin/admin.component').then((m => m.AdminComponent)),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
