import { inject } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import Swal from "sweetalert2";

export const hasPermissionsFunctionGuard = (role:string): boolean =>{
    const router = inject(Router);
    const route = inject(ActivatedRoute);
    // get user role
    const userRole = localStorage.getItem('account');
    const isLogged = localStorage.getItem('access_token') ? true : false;

    // test if user role is an roles array return true or false
    const isAcceptedRole : boolean = role === userRole ? true : false;

    if(isLogged && isAcceptedRole){
        return true
    } else{
        const message =  isLogged ? 'Vous n\'êtes autoriser à accéder à cette page.' : 'Veuillez vous connecter ou s\'incrire pour accéder à cette page.'; 
        router.navigate(['/']).then(() => {
        localStorage.clear();
        Swal.fire({
            title:`<span style="font-size:16px;color:3a3a3a;">${message}</span>`,
            text: '',
            iconColor: '#12829F',
            icon: 'info',
            background: '#FDFBF9',
            confirmButtonColor: "#60cdea",
            allowOutsideClick:false
        }).then( (result:any)=>{ 
            if(result.isConfirmed){
                localStorage.clear();
                window.location.reload()
            }
        })
        }); 
        return false
    }
}