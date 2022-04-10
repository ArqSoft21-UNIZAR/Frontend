import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

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
