import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/model/user.interface';
import { DuesService } from 'src/app/shared/services/dues.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Modal, Ripple, initTE } from "tw-elements";
import * as sweetAlert from 'src/components/sweetAlert/sweetAlert';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dues',
  templateUrl: './dues.component.html',
  styleUrls: ['./dues.component.scss']
})
export class DuesComponent implements OnInit{
  hide : boolean = false;
  p:  number = 1;
  dues :any;
  displayedDues:any;
  loader : boolean = true ;
  createDueForm: FormGroup;
  updateDueForm!: FormGroup<any>;

  isSubmitted : boolean = false;
  displayedUsers : IUser [] = [];
  users$!: Observable<IUser[] | null>;
  updatedDueFromParent:any;
  months = [{label:"Tous", value:13 },
    {label:"Janvier", value:1 }, { label: "Février", value:2 },{ label:"Mars", value:3 }, {label:"Avril", value:4},{label:"Mai", value:5},{label:"Juin", value:6},
    {label:"Juillet", value:7 }, { label: "Août", value:8 },{ label:"Septembre", value:9 }, {label:"Octobre", value:10},{label:"Novembre", value:11},
    {label:"Décembre", value:12},
  ];
  selectedMonth = 'Tous';
  selectedUser = '';
  constructor( private fb : FormBuilder, private duesService : DuesService, private userService: UserService){
    this.createDueForm = this.fb.group({
      contributorId:['', [Validators.required]],
      amount:['', [Validators.required]],
      operator: ['', [Validators.required]],
    });

    this.updateDueForm = this.fb.group({
      amount: [''],
      operator: ['']
    })
  }
 
   
  ngOnInit(): void {
    initTE({ Modal, Ripple });
    this.getAllDues();
    this.getAllUsers();
  }

  createDue(){
    this.isSubmitted = true;
    if(this.createDueForm.invalid){
      return
    }
    const due = {
      contributorId : this.createDueForm.value.contributorId,
      amount : this.createDueForm.value.amount,
      operator : this.createDueForm.value.operator
    }
    sweetAlert.showLoading();
    this.duesService.createDue(due).subscribe(
      (res)=>{
        this.getAllDues();
        Swal.fire('Ajout', 'Cotisation ajouté avec succès','success');
      }
    )
    this.dismissModal();
  }
  // update due
    updateDue() {
      this.isSubmitted = true;
      if(this.updateDueForm.invalid){
        return
      }
    }
  // Get All users
  getAllDues(){
    this.duesService.getAllDues().subscribe(
      (res)=>{
        this.displayedDues = res;
        this.dues = res;
        this.loader = false;
      }
    )
  } 

  getAllUsers(){
    this.userService.users$.subscribe(
      (res: any)=>{
        res ? this.displayedUsers = res : this.getAllUsersFromDB();
      }
    )
  } 

  getAllUsersFromDB(){
    this.userService.getAllUsers().subscribe(
      (res)=>{ this.displayedUsers = res; })
  }

  getUpdatedDue(id:string){
    this.updatedDueFromParent = this.dues.find( (item:any)=> item._id === id);
  }
  
  // dismiss modal
  dismissModal(){
      const button = document.querySelector('#close_button') as HTMLButtonElement;
      button.click();
      this.createDueForm.reset();
      this.isSubmitted = false;
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
      this.selectedMonth = month;
    }
  }

  filterByUser(userId:string){
    if(userId === this.selectedUser){
      this.displayedDues = this.dues;
      this.selectedUser = '';
    }else{
      this.displayedDues  = this.dues.filter(
        (due:any)=>{
          return due.contributorId._id === userId;
        })
        this.selectedUser = userId;
    }
  }
  pageChanged(event:any){
    this.p = event;
    window.scroll(0,0);
  }
}
