import { Component, NgModule, OnInit } from '@angular/core';
import { Message } from '../message';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  nCaracteres: number = 0;
  message: string = ""
  history: Message[] = [];
  tempMessage: Message = new Message();

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
    //Pruebas
    this.tempMessage = new Message();
    this.tempMessage.clientuniqueid = this.userService.getToken();
    this.tempMessage.message = "Esto es una prueba. Repetire todos los mensajes que me mandes";
    this.tempMessage.isSent = false;
    this.tempMessage.date = new Date();

    this.history.push(this.tempMessage);
  }

  //Ejecutado cada vez que se modifica el input.
  changeData(m:string) {
    this.message = m;
    this.nCaracteres = m.length;
  }

  //Ejecutado cuando el usuario quiere enviar el mensaje (enter o boton de enviar)
  send() {
    if(this.message != "") {
      //Create message
      this.tempMessage = new Message();
      this.tempMessage.clientuniqueid = this.userService.getToken();
      this.tempMessage.message = this.message;
      this.tempMessage.isSent = true;
      this.tempMessage.date = new Date();

      this.history.push(this.tempMessage);
      
      //Pruebas
      this.tempMessage = new Message();
      this.tempMessage.clientuniqueid = this.userService.getToken();
      this.tempMessage.message = this.message;
      this.tempMessage.isSent = false;
      this.tempMessage.date = new Date();
      this.history.push(this.tempMessage);



      
      //Clear message displayed
      this.message = "";
      this.nCaracteres = this.message.length;
    }
  }
}
