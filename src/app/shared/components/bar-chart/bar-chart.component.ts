import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnInit{

  @Input() datas: any;
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    datasets: [{
      label:'',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#5aaca8',
      borderColor: '#FF7468',
      borderWidth: 1
    }]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    plugins: {
      title: {
        display: false,
        text: 'Monthly Sales Data',
      },
      legend:{
         display:false,
         position:'bottom',  
         labels:{
          boxWidth:0
         }
      },
      tooltip:{
        enabled:true
      }
    },
  };
  ngOnInit(): void {
    this.setBarDatas(this.datas);
  }

  setBarDatas(data:any){
    for (let i = 0; i < this.barChartData.labels.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if(data[j]._id === this.barChartData.labels[i]){
          this.barChartData.datasets[0].data[i] = data[j].total;
        }
      }}
  }
}