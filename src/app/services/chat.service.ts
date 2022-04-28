import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { Message } from 'src/app/classes/message';
import { UsersService } from './users.service';
  
@Injectable()  
export class ChatService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  
  private connectionIsEstablished = false;
  private _hubConnection!: HubConnection;
  
  constructor(public userService: UsersService,private http: HttpClient) {  
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }  
  
  sendMessage(message: Message) {
    this._hubConnection.invoke('NewMessage', message);
  }

  get(emisor:string, receptor:string) : Observable<any> {
    return this.http.post("https://meetme-b.herokuapp.com/chats/get",
                          { 
                            emisor: emisor,
                            receptor: receptor
                          });
  }
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl('https://meetme-b.herokuapp.com/MessageHub')  
      .build();
  }  
  
  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');
        setTimeout( () => { this.startConnection(); }, 5000);
      });
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on(this.userService.getToken(), (data: any) => {  
      this.messageReceived.emit(data);
    });
  }  
}    