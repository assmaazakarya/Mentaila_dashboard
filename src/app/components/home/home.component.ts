import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLogin : boolean = false
  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    if(this.userService.userData){
      this.isLogin = true
    }else{
      this.isLogin = false
    }
  }
}
