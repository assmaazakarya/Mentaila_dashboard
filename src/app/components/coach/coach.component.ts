import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoachService } from '../services/coach.service';
import { ToastrService } from 'ngx-toastr';
import { ICoach } from '../../DataTypes/coach';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.css'
})
export class CoachComponent implements OnInit {

  coaches : ICoach[] = []
  // coach : ICoach 
  constructor(
    private router : Router,
    private coachService : CoachService,
    private toast : ToastrService
  ){}

    ngOnInit(): void {
     this.getAll()
      
    }

  getAll() {
    console.log('Fetching coaches...');
    this.coachService.getAllCoaches().subscribe({
      next: (response) => {
        this.coaches = response
        console.log('Response received:', response);
      },
      error: (err) => {
        console.error('An error occurred:', err);
        console.log("an error occured");
        this.toast.error('error');
      }
    });
  }
  
  delete(id : string){
    this.coachService.deleteCoach(id).subscribe({
      next : (respone) =>{
        this.getAll()
      }
    })
  }

  getBadgeClass(status: any): Object {
    switch (status) {
      case true: // Compare with boolean values directly
        return { 'bg-secondary': true };
      case false:
        return { 'pinkBg': true };
      default:
        return {}; // Return empty object for unknown states
    }
  }

  // loadCoach(data : string){
  //   this.coach = data
  // }
}
