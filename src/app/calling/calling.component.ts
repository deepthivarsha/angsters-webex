import { Component, OnInit } from '@angular/core';
import { WebexService } from '../services/webex.service';

@Component({
  selector: 'app-calling',
  templateUrl: './calling.component.html',
  styleUrls: ['./calling.component.css']
})
export class CallingComponent implements OnInit {

  constructor(private webex: WebexService,) { }

  ngOnInit(): void {
    if (this.webex.webex === undefined) {
      this.webex.onInit();
  }
 // this.listenForIncoming()
}

}
