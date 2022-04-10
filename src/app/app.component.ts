import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meet Me';
  constructor(public userService: UsersService, public router: Router) { }

  goHome() {
    if (this.userService.getToken()=="") {
      this.router.navigateByUrl("")
    }
    else {
      this.router.navigateByUrl("home")
    }
  }
}
