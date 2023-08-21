import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.scss']
})
export class ContributorComponent {
  toggled : boolean = false;
  public innerWidth:number = 0;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.checkView();
  }

  toggle(){
    if(this.innerWidth <= 768){
      return
    }
    this.toggled = !this.toggled
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/'])
  }

  @HostListener('window:resize',[])
  onResize():void{
    this.checkView();
  }

  // get view
  get isMobile(){ 
    return this.innerWidth <= 768;
  }
  private checkView(){
    this.innerWidth = window.innerWidth;
    this.innerWidth <= 1024 ? this.toggled = true : this.toggled = false; 
  }


}
