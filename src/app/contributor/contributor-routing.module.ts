import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DuesComponent } from './dues/dues.component';
import { ProjectsComponent } from './projects/projects.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  //{ path: '', component: DashboardComponent },
  { path: '', component: DuesComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'settings', component: SettingsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributorRoutingModule { }
