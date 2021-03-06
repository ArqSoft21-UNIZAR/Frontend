import { Component, Inject, NgModule, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/classes/message';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ChatService } from 'src/app/services/chat.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchesService } from 'src/app/services/matches.service';

export interface CitaPopupData {
  destinatario: string;
}

@Component({
  selector: 'cita-popup',
  templateUrl: 'cita-popup.component.html',
  styleUrls: ['cita-popup.component.css']
})
export class CitaPopup {
  constructor(public dialogRef: MatDialogRef<CitaPopup>, public router: Router, public UtilityService: UtilityService, @Inject(MAT_DIALOG_DATA) public data: CitaPopupData, public matchesService : MatchesService, public userService: UsersService) {}
  
  noCita(): void {
    this.matchesService.deleteMatch(this.userService.getToken(),this.data.destinatario).subscribe({
      next: (v) => {
        this.UtilityService.openSnack("Contacto eliminado")
        this.router.navigateByUrl("/home");
        this.dialogRef.close();
      },
      error: (e) => {
        console.log(e);
        this.dialogRef.close();
      }
    });
    
  }

  siCita(): void {
    this.router.navigateByUrl("/cita/"+this.data.destinatario);
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit {
  loading: boolean = true;

  idroute!: string | null;
  profileID!: string;
  name: string = "";
  nCaracteres: number = 0;
  nMensajes: number = 0;
  message: string = "";
  history: Message[] = [];

  constructor(public dialog: MatDialog, public userService: UsersService, public route: ActivatedRoute, public router: Router, public chatService: ChatService, private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.idroute = this.route.snapshot.paramMap.get('id'); //Parametro de la url
    if (this.idroute == null) { this.router.navigateByUrl("/404"); return;  }
    this.profileID = this.idroute;
    this.subscribeToEvents();
    this.userService.get(this.profileID).subscribe({
      next: (v) => {
        this.name = v.nombre + " " + v.apellidos
        this.chatService.get(this.userService.getToken(),this.profileID).subscribe({
          next: (v) => {
            this.history = this.history.concat(v.data);
            this.nMensajes = v.data.length;
            this.loading = false;
          },
          error: (e) => {
            console.log(e);
            this.router.navigateByUrl("/404");
          }
        });
      },
      error: (e) => {
        console.log(e);
        this.router.navigateByUrl("/404");
      }
    });
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
      let tempMessage = new Message();
      tempMessage.sender = this.userService.getToken();
      tempMessage.reciever = this.profileID;
      tempMessage.message = this.message;
      tempMessage.isSent = true;
      tempMessage.date = new Date();

      this.chatService.sendMessage(tempMessage)
      this.history.push(tempMessage);

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

  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe({
      next: (message: Message) => {
        this._ngZone.run(() => {
          message.isSent = false;
          console.log("recibido: ",message);
          this.history.push(message);
        });
      }
    });
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