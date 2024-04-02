import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean = false;
  constructor(
    private UsersService: UsersService
  ) { }

  ngOnInit(): void {
    this.UsersService.userData.subscribe({
      next: () => {
        if (this.UsersService.userData.getValue() != null) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      }
    })
  }



  logOut() {
    this.UsersService.signOut()
  }

}