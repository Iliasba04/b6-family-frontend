import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DuesComponent } from './dues/dues.component';
import { ProjectsComponent } from './projects/projects.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
  
    DashboardComponent,
       DuesComponent,
       ProjectsComponent,
       SettingsComponent,
       UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    SharedModule
  ]
})
export class AdminModule { }
