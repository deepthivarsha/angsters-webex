import { Component, OnInit } from '@angular/core';
import { WebexService } from "../services/webex.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.sass']
})
export class ListMessageComponent implements OnInit {
  room_id_for_list_msgs: string;
  listMessages: any;
  listen_msg;
  testRoomId: string = null;
  isFirstClick = true;
  messageList: any[] = [];

  constructor(private webex: WebexService,private router: Router) {}

  ngOnInit(): void {
    this.webex.onInit()
    this.testRoomId = localStorage.getItem("test_room_id");
  }

  onListMessage(){
    let messages = this.webex.listMessages(this.room_id_for_list_msgs);
    messages.then((m)=>
    {
      this.listMessages=m.items;
      console.log(this.listMessages);
    });
  }

  onListen(){
    this.isFirstClick = !this.isFirstClick;
    this.webex.webex.messages.listen()
    .then(() => {
      alert('listening to message events');
      this.webex.webex.messages.on('created', (event) =>{
         console.log(`Got a message:created event:\n${event}`)
         console.log(event);
         this.listen_msg=event.data.text;
         const room = this.webex.webex.rooms.get(event.data.roomId);
         console.log(JSON.stringify(room));
         this.messageList.push({ listen_msg: event.data.text,mail: event.data.personEmail,type: room.type,title: room.title });
      }
      );
      //this.webex.messages.on('deleted', (event) => console.log(`Got a message:deleted event:\n${event}`));
    })
    .catch((e) => alert(`Unable to register for message events: ${e}`));
 
  }
  onStopListen(){
    this.isFirstClick = !this.isFirstClick;
    this.webex.stopListeningToMessages();
  }

  async sendMeHome() {
    this.router.navigate(['home']);
  }

  onLogout() {
    this.webex.onLogout()
  }

}
