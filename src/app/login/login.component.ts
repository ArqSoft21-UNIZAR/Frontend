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
  loading: boolean = false;
  email: string = "";
  password: string = "";
  serviceError: boolean = false;
  serviceErrorMessage: string = "";
  userError: boolean = false;


  constructor(public userService: UsersService, public router: Router, public utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    this.userService.login(this.email,this.password).subscribe({
      next: (v) => {
        this.userService.setToken(this.email);
        // NOTE(Marcos): Para borrar la cookie (hacer logout): this.cookies.delete("token");
        this.utilityService.goHome();
      },
      error: (e) => {
        this.loading = false;
        console.error(e)
        if (e.error.code == 1 || e.error.code == 2){
          this.userError = true
          this.serviceErrorMessage = e.error.message
        }
        else {
          this.serviceError = true
          this.serviceErrorMessage = e.message
        }
      }
    });
  }

  validate() {
    return this.email == "" || this.password == ""
  }

}
