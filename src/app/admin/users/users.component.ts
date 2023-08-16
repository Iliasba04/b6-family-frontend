import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/model/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import * as sweetAlert from 'src/components/sweetAlert/sweetAlert';
import Swal from 'sweetalert2';
import { Modal, Dropdown, Ripple, initTE} from "tw-elements";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  hide : boolean = false;
  updateAction: boolean = false;
  p:  number = 1;
  users : IUser [] = [];
  displayedUsers : IUser [] = [];
  createUserForm!:FormGroup;
  updateForm!: FormGroup;

  isSubmitted : boolean = false;
  updatedUser!: IUser;
  users$!: Observable<IUser[] | null>;
  loader : boolean = true ;

  constructor(private fb : FormBuilder, private userService: UserService){
    this.createUserForm = this.fb.group({
      firstname:['', [Validators.required]],
      lastname:['', [Validators.required]],
      role: ['', [Validators.required]],
      username:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.updateForm = this.fb.group({
      firstname:[''],
      lastname:[''],
      role: [''],
      username:[''],
    })

  }
  ngOnInit(): void {
    initTE({ Modal, Dropdown,  Ripple });
    this.getAllUsers();
  }

  createUser(){
    this.isSubmitted = true;
    if(this.createUserForm.invalid){
      return
    }
    
    const user = {
      firstname: this.createUserForm.value.firstname,
      lastname:this.createUserForm.value.lastname,
      role: this.createUserForm.value.role,
      username:this.createUserForm.value.username,
      password: this.createUserForm.value.password
    }
    Swal.showLoading(Swal.getDenyButton());
    this.userService.addUser(user).subscribe(
      (res)=>{
        this.getAllUsers();
        Swal.fire('Ajout', 'Utilisateur ajouté avec succès','success');
      }
    );
    this.dismissModal();
  }
  updateUser(){
    this.updateAction = true;
    if(this.updateForm.invalid){
      return
    }
    
    const user = {
      firstname: this.updateForm.value.firstname,
      lastname:this.updateForm.value.lastname,
      role: this.updateForm.value.role,
      username:this.updateForm.value.username,
    }
    sweetAlert.showLoading();
    this.userService.updateUserByAdmin(this.updatedUser._id,user).subscribe(
      (res)=>{
        this.updatedUser.firstname  = user.firstname;
        this.updatedUser.lastname  = user.lastname;
        this.updatedUser.username  = user.username;
        this.updatedUser.role  = user.role;
        Swal.fire('Modification', 'Utilisateur modifié avec succès','success');
      }
    );
    this.dismissModal();
  }
  getUserInfos(user:IUser) {
    this.updatedUser = user;
    this.updateForm.patchValue(
      { firstname:user.firstname, 
        lastname: user.lastname, 
        username: user.username,
        role:user.role
      });
  }
  // Get All users
  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (res)=>{
        this.users = res;
        this.displayedUsers=res;
        this.loader = false;
      }
    )
  } 

  // change status
  changeStatus(userId:string){
    let user = this.users.find( (item) => item._id === userId);
    sweetAlert.showLoading();
    this.userService.changeUserStatus(userId).subscribe(
      (res)=>{
        user ? user.active = !user.active : '';
        Swal.fire('Status', 'Status changé avec succès','success');
      }
    )
  }
// filterByStatus
filterByStatus(status:boolean | string){

  status !== 'tous' ?
  this.displayedUsers = this.users.filter(
    (user)=>{
      return user.active === status;
    }
  ) : this.displayedUsers = this.users;
  this.hide = !this.hide;
}
  // dismiss modal
  dismissModal(){
    if(this.updateAction){
      const button = document.querySelector('#update_button') as HTMLButtonElement;
      button.click();
      this.updateForm.reset();
    }else{
      const button = document.querySelector('#close_button') as HTMLButtonElement;
      button.click();
      this.createUserForm.reset();
      this.isSubmitted = false;
    }
  }

  pageChanged(event:any){
    this.p = event;
    window.scroll(0,0);
  }
}
