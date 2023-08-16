import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/model/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { Modal, Ripple, initTE} from "tw-elements";
import * as sweetAlert from '../../../components/sweetAlert/sweetAlert'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  hide: boolean = true;
  user : IUser;
  passwordVisible : boolean = false;
  default:string = 'default123';
  
  constructor(private userService: UserService){}

  ngOnInit(): void {
    initTE({ Modal, Ripple });
    this.getUserInfos();
  }

  getUserInfos(){
    this.userService.getUserInfos().subscribe(
      (res)=>{
        this.user = res;
      }
    )
  }

  updateUser(updateForm: NgForm){
    const user = {
      firstname : updateForm.value.firstname,
      lastname : updateForm.value.lastname,
      username : updateForm.value.username,
    }
    sweetAlert.showLoading();
    
    this.userService.updateUser(user, this.user._id).subscribe(
      (res)=>{
        Swal.fire('Mise à jour', 'Utilisateur mise à jour avec succès', 'success');
      }
    )
  }
 
}

