import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../message';
import { UsersService } from '../users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CitaPopupData {
  destinatario: string;
}

@Component({
  selector: 'cita-popup',
  templateUrl: 'cita-popup.component.html',
  styleUrls: ['cita-popup.component.css']
})
export class CitaPopup {
  constructor(public dialogRef: MatDialogRef<CitaPopup>, public router: Router, @Inject(MAT_DIALOG_DATA) public data: CitaPopupData) {}
  
  noCita(): void {
    //TODO: Hacer desmatch con la persona
    this.router.navigateByUrl("/home");
    this.dialogRef.close();
  }

  siCita(): void {
    this.router.navigateByUrl("/cita/"+this.data.destinatario);
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  loading: boolean = true;
  profileID!: string | null;
  name: string = "";
  nCaracteres: number = 0;
  nMensajes: number = 0;
  message: string = "";
  history: Message[] = [];
  tempMessage: Message = new Message();

  constructor(public dialog: MatDialog, public userService: UsersService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.profileID = this.route.snapshot.paramMap.get('id'); //Parametro de la url
    //TODO: Hacer request de los mensajes, parsear y actualizar la variable nMensajes
    if (this.profileID == null) { this.router.navigateByUrl("/404"); return;  }
    this.userService.get(this.profileID).subscribe({
      next: (v) => {
        this.loading = false;
        this.name = v.nombre + " " + v.apellidos
      },
      error: (e) => {
        this.router.navigateByUrl("/404");
      }
    });
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
    if(this.message != "" && this.nCaracteres<=280 && this.nMensajes<50) {
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
      //Update messages left
      this.nMensajes += 1;
      if (this.nMensajes == 50) {
        this.openPopupCita();
      }
    }
  }

  openPopupCita(): void {
    const dialogRef = this.dialog.open(CitaPopup, {
        panelClass: 'default',
        data: {destinatario: this.profileID}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result: '+result);
    });
  }
}