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

  //Ejecutado cada vez que se modifica el input. v es el evento keypress (preguntar a Marcos si no se entiende)
  changeData(v:any) {
    this.message = v.target.value
    this.nCaracteres = this.message.length
  }
}
