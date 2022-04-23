import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilityService } from './utility.service';
import { WebsocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Meet Me';
  constructor(public utilityService: UtilityService, public titleService: Title, public WebSocketService: WebsocketService) { }  
  ngOnInit(): void {
    this.titleService.setTitle("Meet me")
    this.WebSocketService.connect();
    this.WebSocketService.incoming.subscribe((data) => {
      console.log(data);
  });
  }
}
