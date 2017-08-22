import {Component, OnInit} from "@angular/core";

import {Subscription} from "rxjs";
import {ConversationService} from "../../../shared/services/conversation.service";
import {Conversation} from "../../../shared/models/Conversation";
import {Config} from "../../../shared/config";
declare let swal;
declare let jQuery;
@Component({
  templateUrl: 'all-messages-actives.component.html',
  styleUrls: [],

})
export class AllMessagesActivesComponent implements OnInit {

  busy: Subscription;
  conversations: Array<Conversation>;
  baseUrl = Config.baseUrl + '/';

  constructor(private conversationServices: ConversationService) {

  }

  ngOnInit() {
    this.getAllMessages();
  }

  private getAllMessages() {
    this.busy = this.conversationServices.getConversationByStatus(1).subscribe(data => {
      this.conversations = data;
    })
  }
}
