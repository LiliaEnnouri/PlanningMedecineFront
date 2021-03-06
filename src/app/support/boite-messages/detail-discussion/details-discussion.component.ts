import {Component, OnInit} from "@angular/core";

import {Subscription} from "rxjs";
import {Conversation} from "../../../shared/models/conversation";
import {Config} from "../../../shared/config";
import {ConversationService} from "../../../shared/services/conversation.service";
import {ActivatedRoute} from "@angular/router";
declare let swal;
declare let jQuery;
@Component({
  templateUrl: 'details-discussion.component.html',
  styleUrls: [],

})
export class DetailsDiscussionComponent implements OnInit {


  busy: Subscription;
  conversation: Conversation;
  baseUrl = Config.baseUrl + '/';
  messageContent: string;

  constructor(private conversationServices: ConversationService, private  route: ActivatedRoute) {
    this.conversation = new Conversation();
  }

  ngOnInit() {
    this.getConersation();
  }

  private getConersation() {
    this.route.params.subscribe(params => {
      this.conversation.id_Conversation = +params["conversationId"];
      this.busy = this.conversationServices.getConversationById(this.conversation.id_Conversation).subscribe(data => {
        this.conversation = data;
        this.conversation.user = this.conversation.student ? this.conversation.student : this.conversation.teacher;
        const messages = [];
        this.conversation.messages.forEach(function (message) {
          message.user = message.student ? message.student : message.teacher;
          messages.push(message);
        });
        this.conversation.messages = messages;
        if (!this.conversation.latest_message.id_Admin) {
          this.conversationServices.setConversationViewed(this.conversation).subscribe();
        }
      })
    });
  }

  public sendMessage() {
    this.busy = this.conversationServices.addConversationMessage(this.conversation, this.messageContent).subscribe(data => {
      this.conversation = data;
      this.conversation.user = this.conversation.student ? this.conversation.student : this.conversation.teacher;
      const messages = [];
      this.conversation.messages.forEach(function (message) {
        message.user = message.student ? message.student : message.teacher;
        messages.push(message);
      });
      this.conversation.messages = messages;
      this.messageContent = '';
      swal({
        title: "Succés!",
        text: 'Message envoyé avec succès',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    })
  }

  public updateConversationStatus(status: number) {
    this.busy = this.conversationServices.updateConversationStatus(this.conversation, status).subscribe(data => {
      this.conversation.status = status;
      swal({
        title: "Succés!",
        text: 'Message status est changé avec succès',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    })
  }
}
