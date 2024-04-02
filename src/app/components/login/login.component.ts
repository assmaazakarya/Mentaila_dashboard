import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../../DataTypes/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  isLogin: boolean = false

  constructor(private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private userService: UsersService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          const userAuth: CustomJwtPayload = jwtDecode(response);
          // console.log(userAuth)
          if (userAuth.isAdmin == true) {
            this.userService.saveToken(response);
            this.userService.saveUserData()
            this.router.navigateByUrl("/main")
            this.toast.show('logged in successhuly')
          } else {
            this.toast.warning('only admin allowed')
            this.router.navigateByUrl("/login")
          }

        }
      })
    }
    (error: any) => {
      console.log("login failed" + error)
    }
  }

  ngOnInit(): void {
    this.userService.userData.subscribe({
      next: () => {
        if (this.userService.userData.getValue != null) {
          this.router.navigateByUrl('/main')
        }
      }
    })
  }
}
