import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoachService } from '../services/coach.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editCoach',
  templateUrl: './editCoach.component.html',
  styleUrls: ['./editCoach.component.css']
})
export class EditCoachComponent  {


  // @Input() data: any | null = null;
  // @Output() userUpdate: EventEmitter<void> = new EventEmitter<void>();
  // coachForm: FormGroup;

  // constructor(
  //   private fb: FormBuilder,
  //   private coachService: CoachService,
  //   private router: Router,
  //   private toast: ToastrService
  // ) {
  //   this.coachForm = this.fb.group({
  //     name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  //     email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
  //     password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
  //     isAdmin: [false]
  //   });
  // }

  // ngOnInit() {
  //   this.patchFormWithData();
  // }
  
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['data'] && this.data) {
  //     this.patchFormWithData();
  //   }
  // }

  // onSubmit(): void {
  //   if (this.coachForm.valid) {
  //     const formData = this.coachForm.value; // No need to prepare FormData manually
  //     this.coachService.editUser(this.data._id, formData).subscribe(
  //       () => {
  //         this.toast.success('User updated successfully');
  //         this.userUpdate.emit(); // Emit event to notify parent component
  //         this.router.navigateByUrl('/users');
  //       },
  //       (error) => {
  //         console.error('Error updating user:', error);
  //         this.toast.error('Failed to update user');
  //       }
  //     );
  //   }
  // }

  // private patchFormWithData(): void {
  //   if (this.data) {
  //     this.coachForm.patchValue({
  //       name: this.data.name,
  //       email: this.data.email,
  //       password: this.data.password,
  //       isAdmin: this.data.isAdmin.toString() // Convert isAdmin to string if needed
  //     });
  //   }
  // }
}
