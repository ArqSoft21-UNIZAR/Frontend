import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  matchesData: any;

  constructor(public userService: UsersService, public matchesService: MatchesService, public utilityService: UtilityService) { }

  ngOnInit(): void {
    this.matchesService.getMatches(this.userService.getToken()).subscribe({
      next: (v) => {
        console.log(v);
        //TODO
        this.matchesData = v;
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  botonNewMatch(): void {
    this.matchesService.requestNew(this.userService.getToken()).subscribe({
      next: (v) => {
        window.location.reload();
      },
      error: (e) => {
        console.error(e)
      }
    });
  }
}
