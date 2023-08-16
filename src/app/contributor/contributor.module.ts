import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributorRoutingModule } from './contributor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DuesComponent } from './dues/dues.component';
import { ProjectsComponent } from './projects/projects.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DuesComponent,
    ProjectsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ContributorRoutingModule,
    SharedModule
  ]
})
export class ContributorModule { }
