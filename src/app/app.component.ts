import { Component } from '@angular/core';
import { UsersService } from './components/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';

  isLogin = false
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
}
