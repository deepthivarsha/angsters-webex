import { Component, OnInit } from '@angular/core';
import { WebexService } from "../services/webex.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.sass']
})
export class ListMessageComponent implements OnInit {
  room_id_for_list_msgs: any;
  listMessages: any;
  listen_msg;
  me: any;
  testRoomId: string = null;
  isFirstClick = true;
  messageList: any[] = [];
  userName: string;
  message : string;
  roomID= 'Y2lzY29zcGFyazovL3VzL1JPT00vOWUyNGM0ZDAtNzFmOC0xMWViLWJjYzktNzlhMDgyNTIyOGFi'

  constructor(private webex: WebexService,private router: Router) {}

  ngOnInit(): void {
    if (this.webex.webex === undefined) {
      this.webex.onInit();
      }
    this.testRoomId = localStorage.getItem("test_room_id");
    this.webex.getMyOwnDetails().then((data)=>{
      console.log(data)
      this.me = data;
      this.userName = data.displayName;
      console.log(this.userName)
      })
      this.onListen();
      this.listRooms();
  }
  onListMessage(){
    let messages = this.webex.listMessages(this.room_id_for_list_msgs);
    this.webex.listMessages(this.roomID).then((msgs) => {
    
      this.listMessages=msgs.items.slice().reverse();
      console.log(this.listMessages);
    });
  }
  listRooms() {
    this.webex.onListRoom().then((rooms) => {
    console.log(JSON.stringify(rooms.items))
    //this.rooms = rooms.items;
    })
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
         console.log("hello"+this.room_id_for_list_msgs)
         console.log("dhjsjd"+event.data)
         if (this.roomID === event.data.roomId)
         {
           this.listMessages.push(event.data);
           console.log(this.listMessages+"recieved")
         }
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

  async sendMessageToSelectedRooms() {

    // send message - fetch promises
        this.webex.onSendMessage(this.message, this.roomID)


   
  }

  async sendMeHome() {
    this.router.navigate(['home']);
  }

  onLogout() {
    this.webex.onLogout()
  }

}
