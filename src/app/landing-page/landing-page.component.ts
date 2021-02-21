import { Component, OnInit } from '@angular/core';
import { ModalService } from '@momentum-ui/angular';
import { StepperAngstersComponent } from '../stepper-angsters/stepper-angsters.component';
import { WebexService } from '../services/webex.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
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
    if (this.webex.webex === undefined) {
      this.webex.onInit();
  }
  this.onRegister();
  this.listRooms();
  this.listMessages();
  //this.assignCopy();

  //this.listenForIncoming();
  }

  async joinMeeting(meeting) {
    
    return meeting.join().then(() => {
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
    })
  }
  listMessages() {
    this.webex.onListMessages(this.roomid).then((msgs) => {
    console.log(JSON.stringify(msgs.items))
    //this.rooms = rooms.items;
  })
}
  
  onDial(){
    //localStorage.setItem('invite',this.invitee)

    return this.webex.webex.meetings.create('Y2lzY29zcGFyazovL3VzL1JPT00vY2M4MmMxYzAtNzQyNy0xMWViLWJiOGEtMzdjNzQ5NjI1YTRk').then((meeting) => {
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

  onhangup(){
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

 activateRoom(index) {
  this.selectedRoomIndex=index
}
}
