import {Component, OnInit} from "@angular/core";

import {Subscription} from "rxjs";
import {ConversationService} from "../../../shared/services/conversation.service";
import {Conversation} from "../../../shared/models/conversation";
import {Config} from "../../../shared/config";
import {ActivatedRoute} from "@angular/router";
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

  constructor(private conversationServices: ConversationService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getAllMessages();
  }

  private getAllMessages() {
    this.route.params.subscribe(params => {
      const user = params["user"];
      this.busy = this.conversationServices.getConversationByStatus(user, 1).subscribe(data => {
        this.conversations = data;
      })
    });
  }
}
