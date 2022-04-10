import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  nCaracteres: number = 0;
  message: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  //Ejecutado cada vez que se modifica el input.
  changeData(m:string) {
    this.message = m;
    this.nCaracteres = m.length;
  }
}
