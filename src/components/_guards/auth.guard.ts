import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    //return false
    if( localStorage.getItem('access_token')){
      return true
    }
    localStorage.clear();

    Swal.fire({
      title:'Veuillez vous connecter ou s\'incrire pour accéder à cette page',
      text: '',
      iconColor: '#12829F', 
      icon: 'info',
      background: '#FDFBF9',
      confirmButtonColor: "#60cdea",
      showConfirmButton: true,
      allowOutsideClick:false
    }).then( (result:any)=>{ 
      if(result.isConfirmed){
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }}).then(() => {
          window.location.reload()
        });
      } 
    })
    
    return false
  }
  
}
 