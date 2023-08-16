import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import * as sweetAlert from 'src/components/sweetAlert/sweetAlert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit{
  passwordVisible : boolean = false;
  confirmPasswordVisible : boolean = false;
  newPasswordVisible : boolean = false;
  default:string = 'default123';
  changePasswordForm : FormGroup;
  isSubmitted : boolean = false;
  
  constructor(private fb : FormBuilder, private userService : UserService, private router : Router){
    this.changePasswordForm = this.fb.group({
      password : ['', [Validators.required]],
      newPassword : ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    
  }

  changePassword(){
    this.isSubmitted = true
    if(this.changePasswordForm.invalid){
      return
    }
    const body = {
      password : this.changePasswordForm.value.password,
      newPassword : this.changePasswordForm.value.newPassword
    }
    sweetAlert.showLoading();
    
    this.userService.changePassword(body).subscribe(
      (res)=>{
        Swal.fire('Mise à jour', 'Mot de passe mise à jour avec succès', 'success');
        localStorage.clear();
       this.router.navigate(['/'])
      }
    )
    this.dismissModal();
  }

   // dismiss modal
   dismissModal(){
    const button = document.querySelector('#password_button') as HTMLButtonElement;
    button.click();
    this.changePasswordForm.reset();
    this.isSubmitted = false;
}
}
