import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup ;
  isSubmitted : boolean = false;
  passwordVisible = false;
  
  constructor(private fb: FormBuilder, private userService:UserService, private router:Router){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {}

  signIn(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return
    }

    Swal.fire({
        title: 'chargement...',
        background: '#FDFBF9',
        iconColor:"#ff6b6b",
        allowOutsideClick: false
    });
    Swal.showLoading(Swal.getDenyButton());
    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.userService.logIn(user).subscribe(
      (res)=>{
        Swal.close();
        if(res.role === 'contributor'){
          this.router.navigate(['/contributor/']);
        }
        else if(res.role === 'admin'){
          this.router.navigate(['/admin/']);
        }
        else{
         this.router.navigate(['/']);
        }
      }
    )
  }
  ngOnDestroy(): void {

  }
}
