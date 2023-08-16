import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements OnInit {
  @Input() datas :any;

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['WAVE', 'OM'],
    datasets: [{
      label:'Cotisation par opérateur',
      data: [35, 55],
      backgroundColor: [
        'rgb(96, 165, 250)',
        'rgb(251, 146, 60)',
      ],
      hoverOffset: 4
    }]
  };

  constructor(){}

  ngOnInit(): void {
    this.setPieDatas(this.datas);
  }

  setPieDatas(data:any){
    //this.pieChartData.datasets[0].data[0] = Math.round( ((data[0].totalAmount + data[1].totalAmount) / data[i].totalAmount ) * 100 );
    for (let i = 0; i < data.length; i++) {
      if(data[i]._id === 'WAVE'){
        this.pieChartData.datasets[0].data[0] = Math.round( (  data[i].totalAmount * 100) / (data[0].totalAmount + data[1].totalAmount) );
      }else{
        this.pieChartData.datasets[0].data[1] = Math.round( (  data[i].totalAmount * 100 ) / (data[0].totalAmount + data[1].totalAmount)  );
      }
    }
  }
}
