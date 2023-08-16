import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributorComponent } from './contributor/contributor.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { hasPermissionsFunctionGuard } from 'src/components/_guards/hasPermissionFunction.guard';

const routes: Routes = [
  { path: '', component: AuthComponent ,loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, 
  { path: 'admin', 
   component: AdminComponent ,
   canMatch : [() => hasPermissionsFunctionGuard('admin')],
   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'contributor',
   component: ContributorComponent, 
   canMatch : [() => hasPermissionsFunctionGuard('contributor')],
   loadChildren: () => import('./contributor/contributor.module').then(m => m.ContributorModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
