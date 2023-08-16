import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  toggled : boolean = false;
  public innerWidth:number = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkView();
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

  logOut(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
