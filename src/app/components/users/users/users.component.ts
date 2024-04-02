import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IRegister } from '../../../DataTypes/users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  user!: any;
  users :IRegister[] = []

  constructor(
    private userService : UsersService,
    private toast : ToastrService
  ){}

    ngOnInit() : void {
    this.getAll()
  }

  getAll() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.users = response;
          console.log(this.users);
        } else {
          console.log('Invalid or empty response:', response);
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      }
    });
  }
  
  
  delete(id: any) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.toast.warning("Deleted successfully");
        this.getAll();
      },
      error: (error) => {
        console.error("An error occurred while deleting:", error);
      }
    });
  }
  
  loadUser(data : any){
    this.user = data
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
  

}
