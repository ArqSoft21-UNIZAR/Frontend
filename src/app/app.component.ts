import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Meet Me';
  constructor(public utilityService: UtilityService, public titleService: Title) { }  
  ngOnInit(): void {
    this.titleService.setTitle("Meet me")
  }
}
