import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DuesService } from '../../services/dues.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-due',
  templateUrl: './update-due.component.html',
})
export class UpdateDueComponent {
updateDueForm!: FormGroup<any>;
isSubmitted : boolean = false;
@Input() updatedDue:any;

constructor(private fb : FormBuilder, private dueService: DuesService){
  this.updateDueForm = this.fb.group({
    amount: [''],
    operator: ['']
  })
}

  updateDue(updateForm: NgForm) {
    const newDue = {
      amount: updateForm.value.amount,
      operator: updateForm.value.operator,
    }
    Swal.showLoading(Swal.getDenyButton());
    this.dueService.updateDue(newDue, this.updatedDue._id).subscribe(
      (res)=>{
        if(res){
          this.updatedDue.amount = newDue.amount;
          this.updatedDue.operator = newDue.operator;
        }
        Swal.fire('Mise à jour', 'Cotisation mise à jour avec succès', 'success');
      }
    )
    this.dismissModal();
  }

  // dismiss modal
  dismissModal(){
    const button = document.querySelector('#update_button') as HTMLButtonElement;
    button.click();
    this.updateDueForm.reset();
    this.isSubmitted = false;
  }

}
