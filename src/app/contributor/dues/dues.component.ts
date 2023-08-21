import { Component, HostListener, OnInit } from '@angular/core';
import { DuesService } from 'src/app/shared/services/dues.service';

@Component({
  selector: 'app-dues',
  templateUrl: './dues.component.html',
  styleUrls: ['./dues.component.scss']
})
export class DuesComponent implements OnInit{
  hide : boolean = false;
  p:  number = 1;
  dues :any;
  totalDues:any;
  displayedDues:any;
  loader : boolean = true ;
  dueLoader : boolean = true;
  months = [{label:"Tous", value:13 },
  {label:"Janvier", value:1 }, { label: "Février", value:2 },{ label:"Mars", value:3 }, {label:"Avril", value:4},{label:"Mai", value:5},{label:"Juin", value:6},
  {label:"Juillet", value:7 }, { label: "Août", value:8 },{ label:"Septembre", value:9 }, {label:"Octobre", value:10},{label:"Novembre", value:11},
  {label:"Décembre", value:12},
];
selectedMonth = 'Tous';
public innerWidth:number = 0;
isMobile : boolean = false;

  constructor(private duesService : DuesService){}
  ngOnInit(): void {
    this.getAllDues();
    this.countDues();
    this.checkView();
  }


   // Get All users
   getAllDues(){
    this.duesService.getAllDuesByContributor(localStorage.getItem('currentUser')).subscribe(
      (res)=>{
        this.displayedDues = res;
        this.dues = res;
        this.loader = false;
      }
    )
  }

     // Get All users
  countDues(){
      this.duesService.countDues(localStorage.getItem('currentUser')).subscribe(
        (res)=>{
          this.totalDues = res;
          this.dueLoader = false;
        }
      )
    }
  selectMonth(month:string){
    const findedMonth = this.months.find( (m)=> m.label === month);
    if(findedMonth.value === 13){
      this.displayedDues = this.dues;
    }else{
      this.displayedDues  = this.dues.filter(
        (due:any)=>{
          return due.month === findedMonth.value;
        }
      )
    }
    this.selectedMonth = month;
  }
  filterByOperator(operator:string){
    if(operator === 'Tout'){
      this.displayedDues = this.dues;
    }else{
      this.displayedDues  = this.dues.filter(
        (due:any)=>{
          return due.operator === operator;
        }
      )
    }
    this.hide = !this.hide
  }
  pageChanged(event:any){
    this.p = event;
    window.scroll(0,0);
  }

  @HostListener('window:resize',[])
  onResize():void{
    this.checkView();
  }
  private checkView(){
    this.innerWidth = window.innerWidth;
    this.innerWidth <= 768 ? this.isMobile = true : this.isMobile = false; 
  }
}
