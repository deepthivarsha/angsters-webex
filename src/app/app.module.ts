import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { ButtonModule, SelectModule, ModalModule, StepperModule, AlertModule, CardModule } from '@momentum-ui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogComponent } from './dialog/dialog.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { StepperAngstersComponent } from './stepper-angsters/stepper-angsters.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CallingComponent } from './calling/calling.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    AuthComponent,
    //SidebarComponent,
    DialogComponent,
    AddMembersComponent,
    SendMessageComponent,
    StepperAngstersComponent,
    LandingPageComponent,
    CallingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    SelectModule,
    NgSelectModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule,
    StepperModule,
    AlertModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
