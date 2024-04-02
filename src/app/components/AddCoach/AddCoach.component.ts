import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoachService } from '../services/coach.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-AddCoach',
  templateUrl: './AddCoach.component.html',
  styleUrls: ['./AddCoach.component.css']
})
export class AddCoachComponent implements OnInit {

  coachForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coachService: CoachService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.coachForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      isAdmin: [false]
    });
  }

  ngOnInit() { }

  onSubmit(): void {
    if (this.coachForm.valid) {
      console.log(this.coachForm.value)
      this.coachService.createCoach(this.coachForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/coaches']);
          this.toast.success('User added successfully');
        },
        error: (error) => {
          console.error('adding coach error:', error);
        }
      });
    }
  }
  

  onChangeCoachRole(isAdmin: boolean) {
    this.coachForm.patchValue({ isAdmin: isAdmin });
    console.log(isAdmin);
  }
}
