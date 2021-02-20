import { Component, OnInit } from '@angular/core';
import { ModalService } from '@momentum-ui/angular';
import { StepperAngstersComponent } from '../stepper-angsters/stepper-angsters.component';
import { WebexService } from "../services/webex.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private modal: ModalService,private webex: WebexService) { }

  ngOnInit(): void {
    console.log("welcome");
    const modalRef = this.modal.open({
      content: StepperAngstersComponent,
      /*data: {
        sampleData: [23, 34, 45, 56]
      },*/
    });
    modalRef.onHide$.subscribe( ex => {
      /* do the stuff to process here */
      /* ex is the data */
    });
  }
  onLogout() {
    this.webex.onLogout()
  }

}
