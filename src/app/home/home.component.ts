import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userService: UsersService, public utilityService: UtilityService) { }

  ngOnInit(): void {
  }

}
