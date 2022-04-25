import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public userService: UsersService, public router: Router, private _snackBar: MatSnackBar) { }

  goHome() {
    if (this.userService.getToken()=="") {
      this.router.navigateByUrl("")
    }
    else {
      this.router.navigateByUrl("home")
    }
  }

  openSnack(message:string, duration:number = 2000) {
    this._snackBar.open(message,'', {
      duration: duration
    });
  }
}
