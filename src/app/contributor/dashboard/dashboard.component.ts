import { Component } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  loader:boolean = true;
  userDatas:any;
  duesDatas : any;
  monthDatas : any;
  constructor( private dashboardService : DashboardService){}
  

  ngOnInit(): void {
    this.getDashDatas();
  }
  getDashDatas(){
    this.dashboardService.getDashboardDatas().subscribe(
      {
        next:(res)=>{
          this.userDatas = res.userDatas;
          this.duesDatas = res.operatorDatas;
          this.monthDatas = res.monthDatas;

          this.loader = false;
        },
        error:(err)=>{
        }
      }
    )
  }
}
