import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  serviceError: boolean = false;
  serviceErrorMessage: string = "";
  userError: boolean = false;


  constructor(public userService: UsersService, public router: Router, public utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.email,this.password).subscribe({
      next: (v) => {
        this.userService.setToken(this.email);
        // NOTE(Marcos): Para borrar la cookie (hacer logout): this.cookies.delete("token");
        this.utilityService.goHome();
      },
      error: (e) => {
        console.error(e)
        this.serviceError = true
        this.serviceErrorMessage = e.message
      }
    });
  }

  validate() {
    return this.email == "" || this.password == ""
  }

}
