import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '@momentum-ui/angular';
import { StepperAngstersComponent } from '../stepper-angsters/stepper-angsters.component';
import { WebexService } from '../services/webex.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {
  userSearchText;
  meet: any;
  incoming_meeting: any;
  added_incoming: any;
  incoming_call: boolean;
  meetCreate:boolean;
  incomingMeet:boolean;
  filteredItems:any;
  roomid;
  rooms:any;
  selectedRoomIndex = -1
  me: any;
  userName: string;
  selectedRoom:any;
  roomID:any;
  room_id_for_list_msgs: any;
  listMessages: any;
  listen_msg;
  //localStorage.setItem('notifOn',false);
  isFirstClick:boolean;
  messageList: any[] = [];
  showAlertMessage: boolean;
  dialogMessage: any;
  message : string;
  d:boolean;
  callJoined: boolean;

  constructor(private modal: ModalService,private webex: WebexService) { }

  ngOnInit(): void {

    console.log("welcome");
    
    /*const modalRef = this.modal.open({
      content: StepperAngstersComponent
    });
    modalRef.onHide$.subscribe( ex => {
      /* do the stuff to process here */
      /* ex is the data */
    //});
    //if (this.webex.webex === undefined) {
      this.webex.onInit();
 // }
  /*this.webex.getMyOwnDetails().then((data)=>{
    console.log(data)
    this.me = data;
    this.userName = data.displayName;
    console.log(this.userName)
    })
  this.onRegister();
  this.listRooms();
  this.listMessages();*/
  //this.assignCopy();

  //this.listenForIncoming();
  this.startActionItems();
  }

  startActionItems(){
    this.webex.getMyOwnDetails().then((data)=>{
      console.log(data)
      this.me = data;
      this.userName = data.displayName;
      console.log(this.userName)
      })
    //this.onRegister();
    this.listRooms();
    this.onListen();

  }
  async joinMeeting(meeting) {
    
    return meeting.join().then(() => {
      this.callJoined = true;
      const mediaSettings = {
        receiveVideo: false,
        receiveAudio: true,
        receiveShare: false,
        sendVideo: false,
        sendAudio: true,
        sendShare: false
      };
  
      // Get our local media stream and add it to the meeting
      return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
        const [localStream, localShare] = mediaStreams;
  
        meeting.addMedia({
          localShare,
          localStream,
          mediaSettings
        });
      });
    });
  }

  listRooms() {
    this.webex.onListRoom().then((rooms) => {
      console.log(JSON.stringify(rooms.items))
      this.rooms = rooms.items;
      this.filteredItems = this.rooms;
      this.selectedRoom = this.rooms[0];
      this.onListMessage();
    })
  }
  onListMessage(){
    let messages = this.webex.listMessages(this.room_id_for_list_msgs);
    this.webex.listMessages(this.selectedRoom.id).then((msgs) => {
      this.listMessages=msgs.items.slice().reverse();
      console.log(this.listMessages);
    });
  }
  onListen(){
    
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
         else{
           if(this.isFirstClick){
            const room =  this.rooms.filter(item => item.id === event.data.roomId);
            console.log(JSON.stringify(room));
            
            this.messageList.push({ listen_msg: event.data.text.slice(0,20),title: room[0].title });
            this.messageList=this.messageList.slice().reverse();
           }
         }
      }
      );
      //this.webex.messages.on('deleted', (event) => console.log(`Got a message:deleted event:\n${event}`));
    })
    .catch((e) => alert(`Unable to register for message events: ${e}`));
 
  }

 notificationOnOrOff(event){
  this.isFirstClick =  !this.isFirstClick;
 }

 async sendMessageToSelectedRooms() {

  // send message - fetch promises
      this.webex.onSendMessage(this.message, this.selectedRoom.id)


 
}
  
  onDial(){
    //localStorage.setItem('invite',this.invitee)
    this.d = false;
    return this.webex.webex.meetings.create(this.selectedRoom.id).then((meeting) => {
      this.meet=meeting;
      this.meetCreate =true;
      this.incomingMeet = false;
      //this.bindMeetingEvents(this.meet);
      return this.joinMeeting(this.meet)

    })
    .catch((error) => {
      console.error(error);
    });
  }

  async onRegister() {
    try {
      await this.webex.webex.meetings.register();
      this.listenForIncoming();
    } catch (error) {
      window.alert(error);
    }
  }

  async listenForIncoming(){
    console.log("listen incoming");
    this.webex.webex.meetings.on('meeting:added', (addedMeetingEvent) => {
      console.log("meeting coming"+ addedMeetingEvent.type);
      if (addedMeetingEvent.type === 'JOIN') {
        console.log("meeting incoming");
        const addedMeeting = addedMeetingEvent.meeting;
        this.incoming_meeting=  addedMeetingEvent
        addedMeeting.acknowledge(addedMeetingEvent.type)
          .then(() => {
            console.log("hi addinng incoming")
            this.added_incoming= addedMeeting
            this.incomingMeet = true;
            this.meetCreate = false;
            this.incoming_call = true;
          });
      }
    });
  }
  onLogout() {
    this.webex.onLogout()
  }

  onhangup(){
    this.callJoined = false;
    if(this.meetCreate){
    this.meet.leave()
    this.meetCreate = false;
  }
    else if(this.incomingMeet){
      this.added_incoming.leave()
      this.incomingMeet = false;
    }

}

async incoming_attend(){
  console.log("attending call")
  if (this.incoming_call = true){
            this.incoming_call = false
           // this.bindMeetingEvents(this.added_incoming);
            return this.joinMeeting(this.added_incoming);}
            else{this.added_incoming.decline()}
}

async incoming_cancel(){
  console.log("declining call")
  this.incoming_call=false
  this.added_incoming.decline()
}

/*filterItem(value){
}*/
  
  assignCopy(){
    this.filteredItems = Object.assign([], this.rooms);
 }
 filterItem(value){
    /*if(!value){
        this.assignCopy();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.rooms).filter(
       item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )*/
    console.log("heyyy"+value);
    if (!value) {
      this.filteredItems =  this.rooms;
  }
  else {
  this.filteredItems =  this.rooms.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
  }
 }

 activateRoom(index,room) {
  this.selectedRoomIndex=index
  this.selectedRoom = room;
  this.roomID = room.id;
  this.onListMessage();
  console.log("selected room:"+room.title);
}
showMessage(msg){
  this.showAlertMessage = true;
  this.dialogMessage = msg;

}
okDialogAction(){
  this.showAlertMessage = false;
}

removeAll() {
  this.messageList = [];
}

joining(){
  this.d = true
}
cancel(){
  this.d=false
}
}
