import {Component, OnInit} from "@angular/core";

import {Subscription} from "rxjs";
import {Conversation} from "app/shared/models/Conversation";
import {Config} from "../../../shared/config";
import {ConversationService} from "app/shared/services/conversation.service";
declare let swal;
declare let jQuery;
@Component({
  templateUrl: 'all-messages-closed.component.html',
  styleUrls: [],

})
export class AllMessagesClosedComponent implements OnInit {

  busy: Subscription;
  conversations: Array<Conversation>;
  baseUrl = Config.baseUrl + '/';

  constructor(private conversationServices: ConversationService) {

  }

  ngOnInit() {
    this.getAllMessages();
  }


  private getAllMessages() {
    this.busy = this.conversationServices.getConversationByStatus(-1).subscribe(data => {
      this.conversations = data;
    })
  }
}
