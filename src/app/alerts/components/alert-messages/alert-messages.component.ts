import { Component, OnInit } from '@angular/core';
import { MessagesService } from "../../services/messages.service";
import { Message } from "../../models/message";

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.styl']
})
export class AlertMessagesComponent implements OnInit {

  message:Message;
  classType: string;

  constructor(private alertService:MessagesService) { 

  }

  ngOnInit() {
    this.alertService.getMessage()
    .subscribe(
      (msg:Message) => {
        this.message = msg;
        switch(this.message.type) {
          case 'success': this.classType = 'alert-success'
          break;
          case 'error' : this.classType = 'alert-danger'
          break;
        }
      }
    );
  }

  close() {
    this.message = null;
  }
}
