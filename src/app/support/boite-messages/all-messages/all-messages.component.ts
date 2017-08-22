import {Component, OnInit} from "@angular/core";

import {Subscription} from "rxjs";
import {ConversationService} from "../../../shared/services/conversation.service";
import {Conversation} from "../../../shared/models/Conversation";
import {Config} from "../../../shared/config";
declare let swal;
declare let jQuery;
@Component({
  templateUrl: 'all-messages.component.html',
  styleUrls: [],

})
export class AllMessagesComponent implements OnInit {

  busy: Subscription;
  conversations: Array<Conversation>;
  baseUrl = Config.baseUrl + '/';

  constructor(private conversationServices: ConversationService) {

  }

  ngOnInit() {
    this.getAllMessages();
  }

  private getAllMessages() {
    this.busy = this.conversationServices.getAllConversations().subscribe(data => {
      this.conversations = data;
    })
  }
}
