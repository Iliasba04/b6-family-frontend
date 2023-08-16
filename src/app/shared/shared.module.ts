import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { UpdateDueComponent } from './components/update-due/update-due.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    LoaderComponent,
    UpdateDueComponent,
    BarChartComponent,
    PieChartComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
  ],
  exports: [
    RouterModule,

    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    
    LoaderComponent,
    UpdateDueComponent,
    BarChartComponent,
    PieChartComponent,
    ChangePasswordComponent
  ]
})
export class SharedModule { }
