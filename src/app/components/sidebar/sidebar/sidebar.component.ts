import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isLogin:boolean = false;

  constructor(
    private userService : UsersService
  ){}

  ngOnInit(): void {
    this.userService.userData.subscribe({
      next:()=>{
        if(this.userService.userData.getValue != null){
          this.isLogin = true
        }else{
          this.isLogin = false
        }
      }
    })
    // if(this.userService.userData){
    //   this.isLogin = true
    // }else{
    //   this.isLogin = false
    // }
  }

}
